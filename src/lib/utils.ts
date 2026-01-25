import { clsx, type ClassValue } from "clsx";
import { compareAsc, format, formatDistanceToNow, parse } from "date-fns";
import { twMerge } from "tailwind-merge";
import { countries, months } from "./data";
import type { CardBrand } from "@/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
    if (!name) return "";
    const nameArr = name.split(" ");

    if (nameArr.length === 1) return (name[0] + name[1]).toUpperCase();
    return (nameArr[0][0] + nameArr[1][0]).toUpperCase();
}

export function getFormattedDate(date: Date) {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
    });
}

export const getFormattedTimes = (times: string[]) => {
    return times
        .map((time) => {
            let parsedTime;
            if (time.split(":").length === 3)
                parsedTime = parse(time, "HH:mm:ss", new Date());
            else parsedTime = parse(time, "HH:mm", new Date());
            return format(parsedTime, "HH:mm");
        })
        .sort((a, b) =>
            compareAsc(
                parse(a, "HH:mm", new Date()),
                parse(b, "HH:mm", new Date()),
            ),
        );
};

export const formatTime = (time: string) => {
    const [hours, minutes] = time?.split(":")?.map(Number) ?? [];
    const suffix = hours >= 12 ? "PM" : "AM";
    const formattedHours = ((hours + 11) % 12) + 1; // يحول 13 → 1
    return `${formattedHours}:${minutes
        ?.toString()
        ?.padStart(2, "0")} ${suffix}`;
};

export function dialFromCountry(code: string) {
    return countries.find((c) => c.code === code)?.dial ?? "+20";
}

export function guessCountryFromPhone(phone: string): string {
    const t = (phone || "").replace(/\s+/g, "");
    if (t.startsWith("+966")) return "SA";
    if (t.startsWith("+971")) return "AE";
    if (t.startsWith("+20")) return "EG";
    return "EG";
}

export function splitPhone(phone: string) {
    const code = guessCountryFromPhone(phone);
    const dial = dialFromCountry(code);
    const local = (phone || "").replace(/\s+/g, "").replace(dial, "");
    return { countryCode: code, local };
}

export function parseBirthdate(iso?: Date | null) {
    if (!iso) return { day: "", month: "", year: "" };
    const m = iso.toString().match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return { day: "", month: "", year: "" };
    const year = m[1];
    const month = months[Number(m[2]) - 1] ?? "";
    const day = String(Number(m[3]));
    return { day, month, year };
}

export function buildBirthdate(
    y?: string | number,
    mName?: string,
    d?: string | number,
) {
    if (!y || !mName || !d) return null;
    const idx = months.indexOf(String(mName));
    if (idx < 0) return null;
    const mm = String(idx + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${y}-${mm}-${dd}`;
}

export const brandLogoSrc = (brand: CardBrand) => {
    switch (brand) {
        case "visa":
            return "/visa.png";
        case "mastercard":
            return "/mastercard.png";
    }
};
