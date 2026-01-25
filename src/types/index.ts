import type { PaymentIntent } from "@stripe/stripe-js";

export type IUserData = {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    date_of_birth: Date;
    gender?: "female" | "male";
    image: string;
    address: string;
    customer_id: string;
    stripe_payment_methods: { pm_id: string; fingerpring: string }[] | [];
    created_at: Date;
    updated_at: Date;
};

export type IDoctor = {
    id: string;
    name: string;
    about: string;
    specialty: string;
    start_time: string;
    end_time: string;
    available_slots: IAvailableSlot[];
    address: {
        x: string;
        y: string;
    };
    price: number;
    image: string;
    experience: string;
    email: string;
    patients: number;
    rate: number;
    is_favourite: boolean;
    updated_at: Date;
    created_at: Date;
    gender: "male" | "female";
};

export type IDoctorDetails = {
    id: string;
    name: string;
    about: string;
    specialty: string;
    available_slots: IAvailableSlot[];
    start_time: string;
    end_time: string;
    address: IAddress;
    price: string;
    image: string;
    experience: number;
    email: string;
    patients: number;
    rate: number;
    is_favourite: boolean;
    created_at: boolean;
    updated_at: boolean;
    reviews: IReview[];
};

export type IAvailableSlot = {
    day: string;
    slots: string[];
};

export type IAddress = {
    x: string;
    y: string;
};

export type IFavouriteDoctor = {
    id: string;
    name: string;
    specialty: string;
    image: string;
    rate: number;
    price: number;
    is_favourite: boolean;
    address: IAddress;
    start_time: string;
    end_time: string;
};

export type IAppointmentSlot = {
    date: Date;
    time: string;
};

export type INotification = {
    id: string;
    title: string;
    message: string;
    icon: string;
    color: string;
    type: string;
    is_read: boolean;
    read_at: Date;
    created_at: Date;
    created_at_formatted: string;
};

export type ISignIn = {
    email: string;
    password: string;
};

export type ISignUp = {
    fullname: string;
    email: string;
    password: string;
};

export type IAppointmentValues = {
    date: string;
    time: string;
    doctor_id: string;
};

export type IAppointmentData = {
    date: string;
    time: string;
    doctor_id: string;
    doctor_name: string;
    price: number;
};

export type IReview = {
    id: string;
    rate: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
    doctor_id: string;
    user_id: string;
    user: {
        fullname: string;
        image: string;
        id: number;
    };
};

export type User = {
    id: string;
    name: Name;
    avatar: null;
};

export enum Name {
    Cfbcb = "cfbcb",
    HumaVolve = "Huma Volve",
    Mohamed = "Mohamed",
}

export type IReviewsLink = {
    url: null | string;
    label: string;
    active: boolean;
};

export type IAppointment = {
    id: string;
    day: string;
    slot: string;
    status: "upcoming" | "completed" | "cancelled" | "all";
    created_at: Date;
    updated_at: Date;
    user_id: string;
    doctor_id: {
        _id: string;
        name: string;
        specialty: string;
        image: string;
        address: IAddress;
    };
    paymentIntent: PaymentIntent;
};

export type UpdateProfilePayload = {
    fullname: string;
    phone: string;
    email: string;
    birthdate: string;
    address: string;
    gender: "female" | "male" | undefined;
    image: File | null;
};

export type ProfileItem = {
    id: string;
    label: string;
    icon: React.ElementType;
    href?: string;
    onClick?: () => void;
    tone?: "default" | "danger";
    type?: "link" | "toggle";
    enabled?: boolean;
};

export type FormValues = {
    email: string;
    fullName: string;
    image: File | string | null;
    phone: string;
    countryCode: string;
    address: string;
    gender: "female" | "male" | undefined;
    day: string | number;
    month: string;
    year: string | number;
};

export type FormResetPassword = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

export interface GeoCodeMapsResult {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: string[];
    lat: string; // or number, depending on actual response
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
}

export interface ISearchDoctorsParams {
    specialty?: string;
    gender?: "male" | "female" | "";
    available?: "today" | "tomorrow" | "today,tomorrow";
    sort?: "price_asc" | "price_desc" | "recommend" | "";
    doctorName?: string;
    limit?: number;
    offset?: number;
}

export type CardBrand = "visa" | "mastercard";

export type StoredCard = {
    id: string;
    brand: CardBrand;
    label: string;
    last4: string;
    isDefault?: boolean;
};

export type PaymentCard = {
    id: string;
    brand: CardBrand;
    expMonth: number;
    expYear: number;
    last4: string;
    masked?: string;
    isDefault?: boolean;
};

export type BookingIntentOptions = {
    amount: number;
    currency: string;
    customer?: string;
    payment_method?: string;
    off_session?: boolean;
    confirm?: boolean;
    automatic_payment_methods?: {
        enabled: boolean;
    };
};
