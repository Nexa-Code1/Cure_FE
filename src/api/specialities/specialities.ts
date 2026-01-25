import axios from "axios";

const BASE_URL = import.meta.env.VITE_ENV === "development" ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_DEFAULT_BASE_URL;

// GET SPECIALITIES
export const getSpecialists = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/specialists`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data.specialists;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// GET SPECIALITY
export const getSpeciality = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/specialities/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
