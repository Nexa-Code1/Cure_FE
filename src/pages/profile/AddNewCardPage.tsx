import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import card from "@/assets/images/blue gradient.png";

type CardBrand = "visa" | "mastercard";

type StoredCard = {
    id: string;
    brand: CardBrand;
    label: string;
    last4: string;
    isDefault?: boolean;
};

const schema = Yup.object({
    brand: Yup.mixed<CardBrand>().oneOf(["visa", "mastercard"]).required(),
    holder: Yup.string()
        .min(2, "Too short")
        .required("Cardholder name is required"),
    number: Yup.string()
        .matches(/^\d{16}$/, "Card number must be 16 digits")
        .required("Card number is required"),
    expMonth: Yup.string()
        .matches(/^(0[1-9]|1[0-2])$/, "MM must be 01-12")
        .required("MM is required"),
    expYear: Yup.string()
        .matches(/^\d{2}$/, "YY must be two digits")
        .required("YY is required"),
    cvv: Yup.string()
        .matches(/^\d{3,4}$/, "CVV must be 3–4 digits")
        .required("CVV is required"),
});

export default function AddNewCardPage() {
    const nav = useNavigate();
    const [showNumber, setShowNumber] = React.useState(false);

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg px-3 sm:px-4 md:px-6">
                <div className="flex items-center gap-2 py-3 sm:py-4">
                    <button
                        type="button"
                        onClick={() => nav("/profile")}
                        aria-label="Back"
                        className="-ml-2 rounded-full p-2 hover:bg-zinc-100"
                    >
                        <ChevronLeft className="h-5 w-5 text-zinc-700" />
                    </button>
                    <h1 className="mx-auto text-lg sm:text-xl font-semibold text-zinc-900">
                        Add New Card
                    </h1>
                    <div className="w-9" />
                </div>

                <div className="mt-1 mb-4">
                    <img
                        src={card}
                        alt="Card preview"
                        className="w-full rounded-2xl shadow"
                    />
                </div>

                <Formik
                    initialValues={{
                        brand: "visa" as CardBrand,
                        holder: "",
                        number: "",
                        expMonth: "",
                        expYear: "",
                        cvv: "",
                    }}
                    validationSchema={schema}
                    validateOnBlur
                    validateOnChange={false}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            const last4 = values.number.slice(-4);
                            const newCard: StoredCard = {
                                id: crypto.randomUUID(),
                                brand: values.brand,
                                label: values.holder || "Card",
                                last4,
                            };

                            const raw = localStorage.getItem("payment_cards");
                            const arr: StoredCard[] = raw
                                ? JSON.parse(raw)
                                : [];
                            arr.push(newCard);
                            localStorage.setItem(
                                "payment_cards",
                                JSON.stringify(arr)
                            );

                            toast.success("Card added successfully");
                            resetForm();
                            nav("/payment-list", { replace: true });
                        } catch (e) {
                            console.error(e);
                            toast.error("Failed to add card");
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-zinc-900">
                                    Card Brand
                                </label>
                                <div className="rounded-xl border border-zinc-200 bg-zinc-100 px-3">
                                    <Field
                                        as="select"
                                        name="brand"
                                        className="w-full bg-transparent py-3 text-sm outline-none"
                                    >
                                        <option value="visa">VISA</option>
                                        <option value="mastercard">
                                            MasterCard
                                        </option>
                                    </Field>
                                </div>
                                <ErrorMessage
                                    name="brand"
                                    component="div"
                                    className="mt-1 text-xs text-rose-600"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-zinc-900">
                                    Cardholder Name
                                </label>
                                <div className="rounded-xl border border-zinc-200 bg-zinc-100 px-3">
                                    <Field
                                        name="holder"
                                        placeholder="Cardholder Name"
                                        className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400"
                                    />
                                </div>
                                <ErrorMessage
                                    name="holder"
                                    component="div"
                                    className="mt-1 text-xs text-rose-600"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-zinc-900">
                                    Card Number
                                </label>
                                <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-100 px-3">
                                    <Field
                                        name="number"
                                        inputMode="numeric"
                                        placeholder="Card Number"
                                        maxLength={16}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            const onlyDigits = e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 16);
                                            setFieldValue("number", onlyDigits);
                                        }}
                                        type={showNumber ? "text" : "password"}
                                        className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400 tracking-widest"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNumber((v) => !v)}
                                        className="ml-2 text-zinc-500 hover:text-zinc-700"
                                        aria-label="Toggle number visibility"
                                    >
                                        {showNumber ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                <ErrorMessage
                                    name="number"
                                    component="div"
                                    className="mt-1 text-xs text-rose-600"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-zinc-900">
                                        Expiry Date
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="rounded-xl border border-zinc-200 bg-zinc-100 px-3">
                                            <Field
                                                name="expMonth"
                                                placeholder="MM"
                                                inputMode="numeric"
                                                maxLength={2}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    const v = e.target.value
                                                        .replace(/\D/g, "")
                                                        .slice(0, 2);
                                                    setFieldValue(
                                                        "expMonth",
                                                        v
                                                    );
                                                }}
                                                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400 text-center"
                                            />
                                        </div>
                                        <div className="rounded-xl border border-zinc-200 bg-zinc-100 px-3">
                                            <Field
                                                name="expYear"
                                                placeholder="YY"
                                                inputMode="numeric"
                                                maxLength={2}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    const v = e.target.value
                                                        .replace(/\D/g, "")
                                                        .slice(0, 2);
                                                    setFieldValue("expYear", v);
                                                }}
                                                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400 text-center"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-1 text-xs text-rose-600">
                                        <ErrorMessage name="expMonth" />
                                        <ErrorMessage name="expYear" />
                                    </div>
                                </div>

                                <div className="col-span-1">
                                    <label className="mb-1 block text-sm font-medium text-zinc-900">
                                        CVV Code
                                    </label>
                                    <div className="rounded-xl border border-zinc-200 bg-zinc-100 px-3">
                                        <Field
                                            name="cvv"
                                            placeholder="CVV"
                                            inputMode="numeric"
                                            maxLength={4}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                const v = e.target.value
                                                    .replace(/\D/g, "")
                                                    .slice(0, 4);
                                                setFieldValue("cvv", v);
                                            }}
                                            className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400 text-center"
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="cvv"
                                        component="div"
                                        className="mt-1 text-xs text-rose-600"
                                    />
                                </div>

                                <div className="col-span-1 hidden sm:block" />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-md hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
