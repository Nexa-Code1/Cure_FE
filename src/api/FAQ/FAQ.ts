import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_ENV === "development" ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_DEFAULT_BASE_URL;

export const handleGetFAQ = async () => {
    try {
        const res = await axios.get(`${BASE_URL}faqs`);

        if (res.status === 200) {
            toast.success("FAQ fetched successfully");
            return res.data.data;
        }
    } catch (error) {
        console.error("Get FAQ error:", error);
        toast.error("Failed to fetch FAQ");
    }
};
