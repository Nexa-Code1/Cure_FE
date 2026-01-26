import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import { Input } from "@/components/ui/input";
import BsHeartPulse from "@/assets/images/BsHeartPulse.png";
import curveBgWhite from "@/assets/images/curve-bg-white.png";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/Loader";
import { handleLogin } from "@/api/auth/auth";
import type { ISignIn } from "@/types";
import { useUserContext } from "@/context/user-context";

export default function SignIn() {
    const navigate = useNavigate();
    const { setUser } = useUserContext();

    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Invalid email")
            .required("Email is required"),
        password: yup
            .string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    });

    const handleLoginSubmit = async (values: ISignIn) => {
        const res = await handleLogin(values);
        if (res) {
            setUser(res);
            navigate("/");
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: handleLoginSubmit,
    });

    return (
        <div className="relative h-screen py-14 lg:py-0">
            <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-center lg:justify-between h-full">
                <div className="flex items-center justify-center lg:absolute lg:top-10 lg:left-20">
                    <img
                        className="w-10 h-10"
                        src={BsHeartPulse}
                        alt="Logo"
                    />
                </div>

                <div className="w-[80%] flex flex-col justify-center mx-auto lg:w-1/3">
                    <h1 className="text-2xl font-bold text-center">
                        Sign in
                    </h1>
                    <p className="text-xs text-center my-4">
                        Please provide all information required to access
                        your account
                    </p>

                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
                                placeholder="Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="current-password"
                            />
                            {formik.errors.password &&
                            formik.touched.password ? (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.password}
                                </p>
                            ) : null}
                        </div>

                        <Link
                            to="/forget-password"
                            className="text-primary my-4 block"
                        >
                            Forgot the password?
                        </Link>

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
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    <div className="text-center mt-4">
                        Don’t have an account?{" "}
                        <Link to="/sign-up" className="text-primary">
                            Sign Up
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
