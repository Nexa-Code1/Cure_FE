import type { FormValues } from "@/types";
import { ErrorMessage, Field, type FieldAttributes } from "formik";
import type { ElementType } from "react";

function InputWithIcon({
    name,
    placeholder,
    icon: Icon,
    type = "text",
    ...props
}: {
    name: keyof FormValues;
    placeholder: string;
    icon: ElementType;
    type?: string;
} & FieldAttributes<FormValues>) {
    return (
        <div>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-3">
                <Icon className="h-4 w-4 text-zinc-500" />
                <Field
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:text-gray-400"
                    {...props}
                />
            </div>
            <ErrorMessage
                name={name}
                component="div"
                className="mt-1 text-xs text-rose-600"
            />
        </div>
    );
}

export default InputWithIcon;
