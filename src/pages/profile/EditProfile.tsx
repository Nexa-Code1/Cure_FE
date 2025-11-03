import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import ReactCountryFlag from "react-country-flag";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Camera,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  MapPinIcon,
  Phone,
  User as UserIcon,
} from "lucide-react";

import { getProfile, updateProfile } from "@/api/profile/profile";
import type { FormValues, IUserData } from "../../types/index";
import {
  buildBirthdate,
  dialFromCountry,
  parseBirthdate,
  splitPhone,
} from "@/lib/utils";
import { countries, months } from "@/lib/data";
import InputWithIcon from "./InputWithIcon";
import { Button } from "@/components/ui/button";
import placeholderImg from "@/assets/images/user-placeholder.png";
import GoBackButton from "@/components/common/GoBackButton";
import { useUserContext } from "@/context/user-context";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

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
  const [avatar, setAvatar] = useState(placeholderImg);
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
      shouldValidate?: boolean
    ) => void
  ) {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    setFieldValue("image", file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function onSubmit(values: FormValues) {
    try {
      const birthdate = buildBirthdate(values.year, values.month, values.day);
      if (!birthdate) {
        console.error("Invalid birthdate");
        return;
      }

      const phone = `${dialFromCountry(
        values.countryCode
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
              <div key={i} className="h-16 rounded-xl bg-zinc-100" />
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
          <p className="text-error-500 text-xl font-semibold mb-4">{error}</p>
          <Button onClick={() => location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full px-4 md:px-6">
        <div className="flex items-center gap-2 py-3">
          <GoBackButton />
          <h1 className="mx-auto text-lg font-semibold text-zinc-900">
            Edit Profile
          </h1>
          <div className="w-9" />
        </div>

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
              {/* Avatar Section */}
              <div className="flex flex-col items-center mt-2">
                <div className="relative">
                  <img
                    src={avatarPreview || avatar}
                    onError={() => {
                      setAvatar(placeholderImg);
                    }}
                    alt="Avatar"
                    className="h-24 w-24 rounded-full object-cover ring-2 ring-white shadow"
                  />

                  <button
                    type="button"
                    className="absolute -bottom-1 -right-1 rounded-full border border-zinc-200 bg-white p-1 shadow cursor-pointer transition hover:bg-accent"
                    aria-label="Change avatar"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4 text-zinc-700" />
                  </button>
                </div>

                <h2 className="mt-3 text-base font-semibold text-zinc-900">
                  {values.fullName || profile?.fullname}
                </h2>
                {values.address && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                    <MapPin className="h-4 w-4" /> {values.address}
                  </p>
                )}
              </div>

              {/* Hidden file input */}
              <input
                title="Change avatar"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => {
                  handleImageFileChange(e, setFieldValue);
                }}
              />

              {/* Form Fields */}
              <div className="space-y-4">
                <InputWithIcon
                  name="email"
                  placeholder="Email"
                  icon={Mail}
                  type="email"
                  disabled
                />

                <InputWithIcon
                  name="fullName"
                  placeholder="Full Name"
                  icon={UserIcon}
                />

                {/* Phone Field */}
                <div>
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-100 p-6">
                    <Phone className="h-4 w-4 text-zinc-500" />
                    <div className="flex items-center gap-2 rounded-lg px-2">
                      <ReactCountryFlag
                        countryCode={values.countryCode || "EG"}
                        svg
                        aria-label={values.countryCode}
                      />
                      <Field
                        as="select"
                        name="countryCode"
                        className="appearance-none bg-transparent pr-4 text-sm outline-none cursor-pointer"
                        aria-label="Country code"
                      >
                        {countries.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.dial}
                          </option>
                        ))}
                      </Field>
                      <ChevronDown className="h-8 w-8 text-zinc-500" />
                    </div>

                    <div className="flex w-full items-center gap-2">
                      <Field
                        name="phone"
                        placeholder="Enter your number"
                        className="w-full bg-transparent py-1.5 text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="mt-1 text-xs text-rose-600"
                  />
                </div>

                <InputWithIcon
                  name="address"
                  placeholder="Address"
                  icon={MapPinIcon}
                  type="text"
                />

                {/* Gender Field */}
                <div>
                  <p className="mb-2 text-sm font-semibold text-zinc-900">
                    Select gender
                  </p>
                  <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-100 p-6">
                    <Field
                      as="select"
                      name="gender"
                      className="w-full appearance-none bg-transparent text-sm outline-none cursor-pointer"
                    >
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Field>
                    <ChevronDown className="h-4 w-4 text-zinc-500" />
                  </div>
                </div>

                {/* Birthday Fields */}
                <div className="pt-2">
                  <p className="mb-2 text-sm font-semibold text-zinc-900">
                    Select your birthday
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-100 p-6">
                        <Field
                          as="select"
                          name="day"
                          className="w-full appearance-none bg-transparent text-sm outline-none cursor-pointer"
                        >
                          <option value="">Day</option>
                          {days.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </Field>
                        <ChevronDown className="h-4 w-4 text-zinc-500" />
                      </div>
                      <ErrorMessage
                        name="day"
                        component="div"
                        className="mt-1 text-xs text-rose-600"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-100 p-6">
                        <Field
                          as="select"
                          name="month"
                          className="w-full appearance-none bg-transparent text-sm outline-none cursor-pointer"
                        >
                          <option value="">Month</option>
                          {months.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </Field>
                        <ChevronDown className="h-4 w-4 text-zinc-500" />
                      </div>
                      <ErrorMessage
                        name="month"
                        component="div"
                        className="mt-1 text-xs text-rose-600"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-100 p-6">
                        <Field
                          as="select"
                          name="year"
                          className="w-full appearance-none bg-transparent text-sm outline-none cursor-pointer"
                        >
                          <option value="">Year</option>
                          {years.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </Field>
                        <ChevronDown className="h-4 w-4 text-zinc-500" />
                      </div>
                      <ErrorMessage
                        name="year"
                        component="div"
                        className="mt-1 text-xs text-rose-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-blue-600 p-6 text-sm font-medium text-white shadow-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Edit Profile"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
