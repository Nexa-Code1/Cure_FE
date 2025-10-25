import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { updatePassword } from "@/api/profile/profile";
import type { FormResetPassword } from "@/types";
import GoBackButton from "@/components/common/GoBackButton";

// Yup validation schema
const PasswordSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
        .required("New password is required")
        .min(8, "Must be at least 8 characters")
        .matches(/[A-Za-z]/, "Must contain a letter")
        .matches(/[0-9]/, "Must contain a number"),
    confirmNewPassword: Yup.string()
        .required("Please confirm the new password")
        .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
});

export default function PasswordManagementPage() {
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const toggleVisibility = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    async function handleResetPassword(
        values: FormResetPassword,
        {
            setSubmitting,
            resetForm,
        }: { setSubmitting: (arg0: boolean) => void; resetForm: () => void }
    ) {
        try {
            await updatePassword(values);
            resetForm();
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg px-3 sm:px-4 md:px-6">
                {/* Header */}
                <div className="flex items-center gap-2 py-3 sm:py-4">
                    <GoBackButton />
                    <h1 className="mx-auto text-lg sm:text-xl font-semibold text-zinc-900">
                        Password management
                    </h1>
                    <div className="w-9" />
                </div>

                {/* Formik form */}
                <Formik
                    initialValues={{
                        currentPassword: "",
                        newPassword: "",
                        confirmNewPassword: "",
                    }}
                    validationSchema={PasswordSchema}
                    onSubmit={handleResetPassword}
                    validateOnBlur
                    validateOnChange={false}
                >
                    {({ isSubmitting }) => (
                        <Form className="mt-4 space-y-5">
                            {/* Current password */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-zinc-900">
                                    Current password
                                </label>
                                <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-100 px-3">
                                    <Field
                                        as="input"
                                        name="currentPassword"
                                        type={
                                            showPassword.current
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Enter current password"
                                        autoComplete="current-password"
                                        className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleVisibility("current")
                                        }
                                        className="ml-2 text-zinc-500 hover:text-zinc-700"
                                    >
                                        {showPassword.current ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                <ErrorMessage
                                    name="currentPassword"
                                    component="div"
                                    className="mt-1 text-xs text-rose-600"
                                />
                            </div>

                            {/* New password */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-zinc-900">
                                    New password
                                </label>
                                <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-100 px-3">
                                    <Field
                                        as="input"
                                        name="newPassword"
                                        type={
                                            showPassword.new
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Enter new password"
                                        autoComplete="new-password"
                                        className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibility("new")}
                                        className="ml-2 text-zinc-500 hover:text-zinc-700"
                                    >
                                        {showPassword.new ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                <ErrorMessage
                                    name="newPassword"
                                    component="div"
                                    className="mt-1 text-xs text-rose-600"
                                />
                            </div>

                            {/* Confirm new password */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-zinc-900">
                                    Confirm new password
                                </label>
                                <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-100 px-3">
                                    <Field
                                        as="input"
                                        name="confirmNewPassword"
                                        type={
                                            showPassword.confirm
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirm new password"
                                        autoComplete="new-password"
                                        className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleVisibility("confirm")
                                        }
                                        className="ml-2 text-zinc-500 hover:text-zinc-700"
                                    >
                                        {showPassword.confirm ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                <ErrorMessage
                                    name="confirmNewPassword"
                                    component="div"
                                    className="mt-1 text-xs text-rose-600"
                                />
                            </div>

                            {/* Submit */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-md hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting
                                        ? "Saving..."
                                        : "Change password"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
