import type { ISignIn, ISignUp } from "@/types";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;
let userOTP = "";

export const handleLogin = async (values: ISignIn) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, values);

    if (res.status === 200) {
      toast.success(`Welcome Back ${res.data.user.fullname} 😊`);
      localStorage.setItem("token", res.data.token);
      return res.data.user;
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.error("Login error:", err);
    if (err.status === 400 && err.response?.data.message) {
      toast.error(err.response?.data.message);
      return;
    }
    toast.error("Something went wrong");
  }
};

export const handleSignUp = async (values: ISignUp) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    });

    if (res.status === 201) {
      toast.success("Successfully sign up 😊");
      return true;
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.error("Sign up error:", err);
    if (err.status === 400 && err.response?.data.message) {
      toast.error(err.response?.data.message);
      return;
    }
    toast.error("Something went wrong");
  }
};

export const handleSendOtp = async (values: { email: string }) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/send-otp`, values);

    if (res.status === 200) {
      toast.success("Otp sent successfully");
      localStorage.setItem("userEmail", values.email);
      return true;
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.error("Send otp error:", err);
    if (err.status === 400 && err.response?.data.message) {
      toast.error(err.response?.data.message);
      return;
    }
    toast.error("Something went wrong");
  }
};

export const handleVerifyOtp = async (otp: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/verify-otp`, {
      email: localStorage.getItem("userEmail"),
      otp,
    });

    if (res.status === 200) {
      userOTP = otp;
      toast.success("Otp verified successfully");
      return true;
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.error("Verify otp error:", err);
    if (err.response?.data.message === "Invalid or expired OTP") {
      toast.error("Invalid or expired OTP");
      return;
    }
    toast.error("Something went wrong");
  }
};

export const handleResetPassword = async (values: {
  password: string;
  password_confirmation: string;
}) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/reset-password`, {
      email: localStorage.getItem("userEmail"),
      otp: userOTP,
      newPassword: values.password,
      confirmPassword: values.password_confirmation,
    });

    if (res.status === 200) {
      toast.success("Password reset successfully");
      localStorage.removeItem("userEmail");
      return true;
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.error("Reset password error:", err);
    toast.error("Something went wrong");
  }
};

export const handleLogout = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.status === 200) {
      localStorage.removeItem("token");
      toast.success("See you soon 👋");
      return true;
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.error("Logout error:", err);
    toast.error("Something went wrong");
  }
};
