import type { FormResetPassword, UpdateProfilePayload } from "@/types";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch profile");
  }
};

export async function updateProfile(data: UpdateProfilePayload) {
  try {
    console.log(data);
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("date_of_birth", data.birthdate);
    formData.append("address", data.address);
    if (data.image) formData.append("image", data.image);

    const res = await axios.put(`${BASE_URL}/user/update-profile`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.status === 200) {
      toast.success("Profile updated successfully");
      return res.data;
    }
  } catch (e) {
    const err = e as AxiosError<{ message?: string }>;
    toast.error("Failed to update profile");
    console.error(err);
    throw err;
  }
}

export async function updatePassword(values: FormResetPassword) {
  try {
    const res = await axios.patch(`${BASE_URL}/user/update-password`, values, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.status === 200) {
      toast.success("Password updated successfully");
      return res.data;
    }
  } catch (e) {
    const err = e as AxiosError<{ message?: string }>;
    const msg = err.response?.data?.message || "Failed to update password";
    toast.error(msg);
    throw err;
  }
}

export async function deleteAccount(password: string) {
  try {
    const res = await axios.delete(`${BASE_URL}/user/delete-profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        password,
      },
    });

    toast.success("Your account was delete successfully");
    return res.data;
  } catch (e) {
    const err = e as AxiosError<{ message?: string }>;
    const msg = err.response?.data?.message || "Failed to delete account";
    toast.error(msg);
    throw err;
  }
}
