import type { IAppointmentValues } from "@/types";
import axios from "axios";

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
export const createDoctorAppointment = async (data: IAppointmentValues) => {
    console.log(data);
    try {
        const response = await axios.post(
            `${BASE_URL}/booking/book-doctor/${data.doctor_id}`,
            { day: data.date, slot: data.time },
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
export const cancelAppointment = async (appointmentId: number) => {
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
