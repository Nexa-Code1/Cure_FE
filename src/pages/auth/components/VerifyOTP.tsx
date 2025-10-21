import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import BsHeartPulse from "@/assets/images/BsHeartPulse.png";
import curveBgWhite from "@/assets/images/curve-bg-white.png";
import GoBackButton from "@/components/common/GoBackButton";
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader } from "@/components/common/Loader";
import { handleVerifyOtp, handleSendOtp } from "@/api/auth/auth";

export default function VerifyOTP() {
    const navigate = useNavigate();

    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const validationSchema = yup.object({
        otp: yup.string().required("OTP is required"),
    });

    const handleVerifyOtpSubmit = async (values: { otp: string }) => {
        const res = await handleVerifyOtp(values.otp);
        if (res) {
            navigate("/reset-password");
        }
    };

    const handleResend = async () => {
        const email = localStorage.getItem("userEmail");
        if (!email) return;
        await handleSendOtp({ email });
        setTimer(60);
        setCanResend(false);
    };

    const formik = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema,
        onSubmit: handleVerifyOtpSubmit,
    });

    return (
        <div className="relative h-screen py-14 lg:py-0">
            <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-center lg:justify-between h-full">
                <div className="flex items-center justify-center lg:absolute lg:top-10 lg:left-20">
                    <img className="w-10 h-10" src={BsHeartPulse} alt="Logo" />
                </div>
                <div className="absolute top-30 left-10 lg:left-20">
                    <GoBackButton />
                </div>

                <div className="w-[80%] flex flex-col justify-center mx-auto lg:w-1/3">
                    <h1 className="text-2xl font-bold text-center">
                        Code Verification
                    </h1>
                    <p className="text-xs text-center my-4">
                        Please enter the code sent to your email
                    </p>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex justify-center gap-2 w-full mb-4">
                            <InputOTP
                                maxLength={6}
                                value={formik.values.otp}
                                onChange={(val) =>
                                    formik.setFieldValue("otp", val)
                                }
                                onBlur={formik.handleBlur}
                                name="otp"
                                className="w-full mx-auto"
                            >
                                <InputOTPGroup>
                                    {[...Array(6)].map((_, i) => (
                                        <InputOTPSlot
                                            key={i}
                                            index={i}
                                            className="w-[50px] border"
                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        {formik.errors.otp && formik.touched.otp ? (
                            <p className="text-red-500 text-sm text-center my-4">
                                {formik.errors.otp}
                            </p>
                        ) : null}

                        <div className="text-center my-4">
                            {canResend ? (
                                <p
                                    onClick={handleResend}
                                    className="text-primary cursor-pointer hover:underline"
                                >
                                    Resend OTP
                                </p>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    Resend OTP in{" "}
                                    <span className="text-primary">
                                        {timer}{" "}
                                    </span>
                                    s
                                </p>
                            )}
                        </div>

                        <Button
                            className="w-full py-6"
                            type="submit"
                            disabled={
                                formik.isSubmitting ||
                                Object.keys(formik.errors).length > 0
                            }
                        >
                            {formik.isSubmitting ? (
                                <Loader size={"md"} variant="white" />
                            ) : (
                                "Verify"
                            )}
                        </Button>
                    </form>
                </div>

                <div className="hidden lg:flex w-[40%]">
                    <img
                        src={curveBgWhite}
                        alt="image"
                        className="w-full object-cover h-full"
                    />
                </div>
            </div>
        </div>
    );
}
