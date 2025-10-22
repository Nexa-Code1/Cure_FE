export type IUserData = {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  date_of_birth: Date;
  gender?: "female" | "male";
  image: string;
  address: string;
  created_at: Date;
  updated_at: Date;
};

export type IDoctor = {
  id: number;
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
  id: number;
  name: string;
  about: string;
  specialty: string;
  available_slots: IAvailableSlot[];
  start_time: string;
  end_time: string;
  address: IAddress;
  price: number;
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
  id: number;
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
  doctor_id: number;
};

export type IReview = {
  id: number;
  rate: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
  doctor_id: number;
  user_id: number;
  user: {
    fullname: string;
    image: string;
  };
};

export type User = {
  id: number;
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
  id: number;
  day: string;
  slot: string;
  status: "upcoming" | "completed" | "cancelled" | "all";
  created_at: Date;
  updated_at: Date;
  user_id: number;
  doctor_id: number;
  doctor: {
    id: number;
    name: string;
    specialty: string;
    image: string;
    address: IAddress;
  };
};

export type UpdateProfilePayload = {
  phone: string;
  fullname: string;
  image: File | null;
  email: string;
  birthdate: string;
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
  image: File | null;
  phone: string;
  countryCode: string;
  day: string | number | "";
  month: string | "";
  year: string | number | "";
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
