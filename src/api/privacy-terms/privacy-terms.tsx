import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const handleGetPrivacyPolicy = async () => {
    try {
        const res = await axios.get(`${BASE_URL}pages/terms-and-conditions`);

        if (res.status === 200) {
            return res.data.data;
        }
    } catch (error) {
        console.error("Get Privacy Policy error:", error);
        toast.error("Failed to fetch Privacy Policy");
    }
};
