import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import ReactCountryFlag from "react-country-flag";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Camera,
  ChevronDown,
  ChevronLeft,
  Mail,
  MapPin,
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
  const [avatar, setAvatar] = useState(profile?.image || placeholderImg);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProfile();
        setProfile(data);
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const initialValues: FormValues = useMemo(() => {
    if (!profile) {
      return {
        email: "",
        fullName: "",
        image: null,
        phone: "",
        countryCode: "EG",
        day: "",
        month: "",
        year: "",
      };
    }

    const { countryCode, local } = profile.phone
      ? splitPhone(profile.phone)
      : { countryCode: "EG", local: "" };

    const { day, month, year } = profile.date_of_birth
      ? parseBirthdate(profile.date_of_birth)
      : { day: "", month: "", year: "" };

    return {
      email: profile.email,
      fullName: profile.fullname,
      image: profile.image,
      phone: local,
      countryCode,
      day,
      month,
      year,
    };
  }, [profile]);

  function handleImageFileChange(
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: File,
      shouldValidate?: boolean | undefined
    ) => void
  ) {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    else {
      setFieldValue("image", file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  async function onSubmit(values: FormValues) {
    const birthdate = buildBirthdate(values.year, values.month, values.day);
    if (!birthdate) return;

    const phone = `${dialFromCountry(values.countryCode)}${values.phone.replace(
      /\s+/g,
      ""
    )}`;

    await updateProfile({
      email: values.email,
      phone,
      fullname: values.fullName,
      birthdate,
      image: values.image,
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg px-4 md:px-6">
          <div className="flex items-center gap-2 py-3">
            <div className="h-9 w-9 rounded-full bg-zinc-100" />
            <div className="mx-auto h-6 w-28 rounded bg-zinc-100" />
            <div className="w-9" />
          </div>
          <div className="mt-6 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 rounded-xl bg-zinc-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-center">
        <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg px-4 md:px-6 py-6">
          <p className="text-error-500 text-xl font-semibold mb-4">{error}</p>
          <Button onClick={() => location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg px-4 md:px-6">
        <div className="flex items-center gap-2 py-3">
          <button
            type="button"
            aria-label="Back"
            className="-ml-2 rounded-full p-2 hover:bg-zinc-100"
            onClick={() => nav("/profile")}
          >
            <ChevronLeft className="h-5 w-5 text-zinc-700" />
          </button>
          <h1 className="mx-auto text-lg font-semibold text-zinc-900">
            Edit Profile
          </h1>
          <div className="w-9" />
        </div>

        <div className="mt-2 flex flex-col items-center">
          <div className="relative">
            <img
              src={avatarPreview  || avatar || placeholderImg}
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

            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnBlur
              validateOnChange={false}
            >
              {({ setFieldValue }) => (
                <input
                  title="Change avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                      setFieldValue("image", file);
                      setAvatarPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              )}
            </Formik>
          </div>

          <h2 className="mt-3 text-base font-semibold text-zinc-900">
            {profile.fullname}
          </h2>
          {profile.address && (
            <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
              <MapPin className="h-4 w-4" /> {profile.address}
            </p>
          )}
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
          {({ setFieldValue, values }) => (
            <Form className="mt-6 space-y-4">
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

              <InputWithIcon
                name="email"
                placeholder="Email"
                icon={Mail}
                type="email"
                disabled
              />

              <InputWithIcon
                name="fullName"
                placeholder="FullName"
                icon={UserIcon}
              />

              <div>
                <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-100 px-2 py-2">
                  <div className="flex items-center gap-2 rounded-lg bg-white px-2 py-2">
                    <ReactCountryFlag
                      countryCode={values.countryCode || "EG"}
                      svg
                      aria-label={values.countryCode}
                      style={{
                        width: "1.25rem",
                        height: "1.25rem",
                        borderRadius: "3px",
                      }}
                      className="shadow-sm"
                    />
                    <select
                      value={values.countryCode}
                      onChange={(e) =>
                        setFieldValue("countryCode", e.target.value)
                      }
                      className="appearance-none bg-transparent pr-4 text-sm outline-none"
                      aria-label="Country code"
                    >
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.dial}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="h-4 w-4 text-zinc-500" />
                  </div>

                  <div className="flex w-full items-center gap-2">
                    <Phone className="h-4 w-4 text-zinc-500" />
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

              <div className="pt-2">
                <p className="mb-2 text-sm font-semibold text-zinc-900">
                  Select your birthday
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-2">
                      <Field
                        as="select"
                        name="day"
                        className="w-full appearance-none bg-transparent text-sm outline-none"
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
                    <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-2">
                      <Field
                        as="select"
                        name="month"
                        className="w-full appearance-none bg-transparent text-sm outline-none"
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
                    <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-2">
                      <Field
                        as="select"
                        name="year"
                        className="w-full appearance-none bg-transparent text-sm outline-none"
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

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-md hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
