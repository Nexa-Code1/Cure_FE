import type {
    BookingIntentOptions,
    IAppointmentData,
    IAppointmentValues,
} from "@/types";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// GET USER APPOINTMENTS
export const getUserAppointments = async (filterBy: null | string) => {
    try {
        let endpoint = "/booking/my-bookings";
        if (filterBy) endpoint += `?filter=${filterBy}`;

        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });
        return response.data.bookings;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// POST DOCTOR APPOINTMENT
export const createDoctorAppointment = async (
    data: IAppointmentData,
    paymentIntent: string
) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/booking/book-doctor/${data.doctor_id}`,
            { day: data.date, slot: data.time, paymentIntent },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// UPDATE DOCTOR APPOINTMENT
export const updateDoctorAppointment = async (
    data: IAppointmentValues,
    appointmentId: string
) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/booking/update-booking/${appointmentId}`,
            { day: data.date, slot: data.time },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        const err = e as AxiosError<{ message?: string }>;
        const msg =
            err.response?.data?.message || "Failed to update appointment";
        toast.error(msg);
        throw err;
    }
};

// POST DOCTOR APPOINTMENT
export const createBookingIntent = async (
    doctorId: number,
    options: BookingIntentOptions
) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/booking/book-intent/${doctorId}`,
            {
                options,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// CANCEL USER APPOINTMENT
export const cancelAppointment = async (appointmentId: string) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/booking/cancel-doctor/${appointmentId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
