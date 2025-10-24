import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import BsHeartPulse from "@/assets/images/BsHeartPulse.png";
import curveBgWhite from "@/assets/images/curve-bg-white.png";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/Loader";
import { handleSignUp } from "@/api/auth/auth";
import type { ISignUp } from "@/types";
import { social } from "@/lib/data";

export default function SignUp() {
    const navigate = useNavigate();
    const [checkbox, setCheckbox] = useState(false);

    const validationSchema = yup.object({
        fullname: yup.string().required("Full name is required"),
        email: yup
            .string()
            .email("Invalid email")
            .required("Email is required"),
        password: yup
            .string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    });

    const handleSignUpSubmit = async (values: ISignUp) => {
        if (!checkbox) {
            toast.error("Please accept the terms and conditions");
            return;
        }
        const res = await handleSignUp(values);
        if (res) {
            navigate("/sign-in");
        }
    };

    const formik = useFormik({
        initialValues: {
            fullname: "Test User",
            email: "namih68266@apocaw.com",
            password: "12345678",
        },
        validationSchema,
        onSubmit: handleSignUpSubmit,
    });

    return (
        <div className="relative lg:min-h-screen py-14 lg:py-0">
            <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-center lg:justify-between h-full">
                <div className="flex items-center justify-center lg:absolute lg:top-10 lg:left-20">
                    <img className="w-10 h-10" src={BsHeartPulse} alt="Logo" />
                </div>

                <div className="w-[80%] flex flex-col justify-center mx-auto lg:w-1/3">
                    <h1 className="text-2xl font-bold text-center">
                        Create New Account
                    </h1>
                    <p className="text-xs text-center">
                        Please provide all information required to create your
                        account
                    </p>

                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                name="fullname"
                                value={formik.values.fullname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Name"
                                autoComplete="username"
                            />
                            {formik.errors.fullname &&
                            formik.touched.fullname ? (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.fullname}
                                </p>
                            ) : null}
                        </div>

                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Email"
                                autoComplete="email"
                            />
                            {formik.errors.email && formik.touched.email ? (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.email}
                                </p>
                            ) : null}
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Password"
                                autoComplete="new-password"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                                Must be at least eight characters
                            </p>
                            {formik.errors.password &&
                            formik.touched.password ? (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.password}
                                </p>
                            ) : null}
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="terms"
                                checked={checkbox}
                                onCheckedChange={(checked) =>
                                    setCheckbox(Boolean(checked))
                                }
                            />
                            <p className="text-xs md:text-sm my-4">
                                I agree to the{" "}
                                <span className="text-primary">
                                    Terms of Service
                                </span>{" "}
                                and{" "}
                                <span className="text-primary">
                                    Privacy Policy
                                </span>
                            </p>
                        </div>

                        <Button
                            className="w-full py-5"
                            type="submit"
                            disabled={
                                formik.isSubmitting ||
                                Object.keys(formik.errors).length > 0
                            }
                        >
                            {formik.isSubmitting ? (
                                <Loader size={"md"} variant="white" />
                            ) : (
                                "Create an account"
                            )}
                        </Button>
                    </form>

                    <div className="my-6">
                        <div className="w-full relative h-0.5 bg-gray-200">
                            <div className="absolute text-gray-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 rounded-full">
                                or
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-4">
                        {social.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white p-4 rounded-2xl border cursor-pointer"
                            >
                                {item.icon}
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        Already have an account!{" "}
                        <Link to="/sign-in" className="text-primary">
                            Sign In
                        </Link>
                    </div>
                </div>

                <div className="hidden lg:flex w-[40%]">
                    <img
                        src={curveBgWhite}
                        alt=""
                        className="w-full object-cover h-full"
                    />
                </div>
            </div>
        </div>
    );
}
