import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { getProfile, updateProfile } from "@/api/profile/profile";
import type { FormValues, IUserData } from "../../types";
import {
    buildBirthdate,
    dialFromCountry,
    parseBirthdate,
    splitPhone,
} from "@/lib/utils";
import { AvatarSection } from "./components/AvatarSection";
import { ProfileHeader } from "./components/ProfileHeader";
import { PersonalInfoForm } from "./components/PersonalInfoForm";
import { SubmitButton } from "./components/SubmitButton";
import { useUserContext } from "@/context/user-context";
import { months } from "@/lib/data";

import { Button } from "@/components/ui/button";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    fullName: Yup.string().min(2, "Too short").required("Required"),
    phone: Yup.string()
        .matches(/^[0-9]{7,15}$/, "Digits only (7–15)")
        .required("Required"),
    countryCode: Yup.string().required("Required"),
    day: Yup.mixed().required("Required"),
    month: Yup.string()
        .oneOf(months as unknown as string[])
        .required("Required"),
    year: Yup.mixed().required("Required"),
});

export default function EditProfilePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<IUserData | null>(null);
    const [avatar, setAvatar] = useState("");
    const { handleGetUser } = useUserContext();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getProfile();
                setProfile(data);
                if (data.image) {
                    setAvatar(data.image);
                }
            } catch {
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const initialValues = useMemo((): FormValues => {
        if (!profile) {
            return {
                email: "",
                fullName: "",
                image: null,
                phone: "",
                countryCode: "EG",
                address: "",
                gender: undefined,
                day: "",
                month: "",
                year: "",
            };
        }

        const { countryCode, local } = profile.phone
            ? splitPhone(profile.phone)
            : { countryCode: "EG", local: profile.phone };

        const { day, month, year } = profile.date_of_birth
            ? parseBirthdate(profile.date_of_birth)
            : { day: "", month: "", year: "" };

        return {
            email: profile.email || "",
            fullName: profile.fullname || "",
            image: profile.image || null,
            phone: local,
            countryCode,
            address: profile.address || "",
            gender: profile.gender,
            day,
            month,
            year,
        };
    }, [profile]);

    function handleImageFileChange(
        e: ChangeEvent<HTMLInputElement>,
        setFieldValue: (
            field: string,
            value: File | null,
            shouldValidate?: boolean,
        ) => void,
    ) {
        const file = e.currentTarget.files?.[0];
        if (!file) return;

        setFieldValue("image", file);
        setAvatarPreview(URL.createObjectURL(file));
    }

    async function onSubmit(values: FormValues) {
        try {
            console.log(values);
            const birthdate = buildBirthdate(
                values.year,
                values.month,
                values.day,
            );
            if (!birthdate) {
                console.error("Invalid birthdate");
                return;
            }

            const phone = `${dialFromCountry(
                values.countryCode,
            )}${values.phone.replace(/\s+/g, "")}`;

            await updateProfile({
                email: values.email,
                phone: phone,
                fullname: values.fullName,
                address: values.address,
                gender: values.gender,
                birthdate: birthdate,
                image: values.image as File | null,
            });

            handleGetUser();
        } catch (error) {
            console.error("Failed to update profile:", error);
            setError("Failed to update profile");
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="mx-auto w-full px-4 md:px-6">
                    <div className="flex items-center gap-2 py-3">
                        <div className="h-9 w-9 rounded-full bg-zinc-100" />
                        <div className="mx-auto h-6 w-28 rounded bg-zinc-100" />
                        <div className="w-9" />
                    </div>
                    <div className="mt-6 space-y-4">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-16 rounded-xl bg-zinc-100"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error && !profile) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center text-center">
                <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg px-4 md:px-6 py-6">
                    <p className="text-error-500 text-xl font-semibold mb-4">
                        {error}
                    </p>
                    <Button onClick={() => location.reload()}>Retry</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto w-full px-4 md:px-6">
                <ProfileHeader />

                <Formik
                    key={profile?.id ?? "empty"}
                    initialValues={initialValues}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    validateOnBlur
                    validateOnChange={false}
                >
                    {({ setFieldValue, values, isSubmitting }) => (
                        <Form className="space-y-6">
                            <AvatarSection
                                avatar={avatar}
                                avatarPreview={avatarPreview}
                                fullName={values.fullName}
                                address={values.address}
                                profile={profile}
                                fileInputRef={fileInputRef}
                                handleImageFileChange={handleImageFileChange}
                                setFieldValue={setFieldValue}
                                setAvatar={setAvatar}
                            />

                            {/* Form Fields */}
                            <PersonalInfoForm values={values} />

                            <SubmitButton isSubmitting={isSubmitting} />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
