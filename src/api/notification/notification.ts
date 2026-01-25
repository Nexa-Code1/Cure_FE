import { BASE_URL } from "@/lib/utils";
import axios from "axios";

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
