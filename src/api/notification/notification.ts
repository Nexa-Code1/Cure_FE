import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getNotification = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/notifications`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
