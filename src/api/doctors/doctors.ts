import type { ISearchDoctorsParams } from "@/types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// GET DOCTORS DATA
export const getDoctors = async (searchParams: ISearchDoctorsParams) => {
    try {
        const params: string[] = [];
        Object.entries(searchParams)
            .filter((param) => !!param[1])
            .forEach((param) => params.push(`${param[0]}=${param[1]}`));

        let endpoint = "/doctor/get-doctors";
        if (params.length > 0) endpoint += `?${params.join("&")}`;

        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// GET TOP RATED DOCTORS
export const getTopRatedDoctors = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/doctor/get-top-rated-doctors`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.doctors;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// GET DOCTOR DETAILS
export const getDoctorDetails = async (id: string) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/doctor/get-doctor/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.doctor;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// POST REVIEW
export const addReview = async (reviewData: {
    doctorId: number;
    rating: number;
    comment: string;
}) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/review/add-review/${reviewData.doctorId}`,
            { rate: reviewData.rating, comment: reviewData.comment },
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
