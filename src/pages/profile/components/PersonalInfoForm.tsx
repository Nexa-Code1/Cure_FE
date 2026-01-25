import ReactCountryFlag from "react-country-flag";
import { ErrorMessage, Field } from "formik";
import { ChevronDown, Mail, MapPinIcon, Phone, User as UserIcon } from "lucide-react";

import InputWithIcon from "../InputWithIcon";
import { countries, months } from "@/lib/data";
import type { FormValues } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface PersonalInfoFormProps {
    values: FormValues;
}

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

export function PersonalInfoForm({ values }: PersonalInfoFormProps) {
    return (
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
                <Select
                    onValueChange={(value: string) =>
                        (values.gender = value as "male" | "female" | undefined)
                    }
                    defaultValue={values.gender || ""}
                >
                    <SelectTrigger className="flex h-auto w-full items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-zinc-100 p-6 shadow-none outline-none focus:ring-transparent">
                        <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                </Select>
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
    );
}
