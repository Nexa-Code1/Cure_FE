import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import { Input } from "@/components/ui/input";
import BsHeartPulse from "@/assets/images/BsHeartPulse.png";
import curveBgWhite from "@/assets/images/curve-bg-white.png";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/Loader";
import { handleSignUp } from "@/api/auth/auth";
import type { ISignUp } from "@/types";

export default function SignUp() {
    const navigate = useNavigate();

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
        const res = await handleSignUp(values);
        if (res) {
            navigate("/sign-in");
        }
    };

    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: handleSignUpSubmit,
    });

    return (
        <div className="relative h-screen py-14 lg:py-0">
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

                        <Button
                            className="w-full py-5 mt-4"
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

                    <div className="text-center mt-4">
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
