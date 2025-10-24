import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const handleGetFavorites = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/favourite/get-favourites`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.error("Get favourites error:", error);
        throw error;
    }
};

export const handleAddFavorite = async (doctorId: string) => {
    try {
        const res = await axios.post(
            `${BASE_URL}/favourite/add-favourite/${doctorId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (res.status === 201) {
            toast.success("Doctor added to your favourites");
            return true;
        }
    } catch (error) {
        console.error("Add favorite error:", error);
        toast.error("Failed to add doctor to favourites");
    }
};

export const handleRemoveFavorite = async (doctorId: string) => {
    try {
        const res = await axios.delete(
            `${BASE_URL}/favourite/delete-favourite/${doctorId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (res.status === 200) {
            toast.success("Doctor removed from your favourites");
            return true;
        }
    } catch (error) {
        console.error("Remove favorite error:", error);
        toast.error("Failed to remove doctor from favourites");
    }
};
