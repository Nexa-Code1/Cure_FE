import BsHeartPulse from "../../../assets/images/BsHeartPulse.png";
import curveBgWhite from "../../../assets/images/curve-bg-white.png";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { Loader } from "@/components/common/Loader";
import { Input } from "@/components/ui/input";
import GoBackButton from "@/components/common/GoBackButton";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { handleResetPassword } from "@/api/auth/auth";

export default function ResetPassword() {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    password: yup.string().required("Password is required"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const handleResetPasswordSubmit = async (values: {
    password: string;
    password_confirmation: string;
  }) => {
    const res = await handleResetPassword(values);
    if (res) {
      navigate("/sign-in");
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema,
    onSubmit: handleResetPasswordSubmit,
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
          <h1 className="text-2xl font-bold text-center">Set new password</h1>
          <p className="text-xs text-center my-4">
            Create a new password, ensure it different form your previous ones
            for security.
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <Label>New Password</Label>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="password"
              />
              {formik.errors.password && formik.touched.password ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>

            <div className="mb-6">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm Password"
                name="password_confirmation"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="password"
              />
              {formik.errors.password_confirmation &&
              formik.touched.password_confirmation ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password_confirmation}
                </p>
              ) : null}
            </div>

            <Button
              className="w-full py-6"
              type="submit"
              disabled={
                formik.isSubmitting || Object.keys(formik.errors).length > 0
              }
            >
              {formik.isSubmitting ? (
                <Loader size={"md"} variant="white" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
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
