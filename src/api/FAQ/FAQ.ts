import { BASE_URL } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";

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
