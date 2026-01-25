import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_ENV === "development" ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_DEFAULT_BASE_URL;

export async function createSetupIntent() {
  try {
    const res = await axios.post(
      `${BASE_URL}/payment/create-setup-intent`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return res.data;
  } catch (e) {
    const err = e as AxiosError<{ message?: string }>;
    const msg = err.response?.data?.message || "Failed to create setup intent";
    toast.error(msg);
    throw err;
  }
}

export async function addPaymentMethod(paymentMethodId: string) {
  try {
    const res = await axios.post(
      `${BASE_URL}/payment/add-payment-method`,
      { pm_id: paymentMethodId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.status === 200) {
      toast.success("Payment method added successfully");
      return true;
    }
  } catch (e) {
    const err = e as AxiosError<{ message?: string }>;
    if (err.response?.data.message) toast.error(err.response.data.message);
    else toast.error("Failed to add payment method");
    throw err;
  }
}

export async function removePaymentMethod(paymentMethodId: string) {
  try {
    const res = await axios.post(
      `${BASE_URL}/payment/remove-payment-method`,
      { pm_id: paymentMethodId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.status === 200) {
      toast.success("Payment method deleted successfully");
      return true;
    }
  } catch (e) {
    const err = e as AxiosError<{ message?: string }>;
    toast.error("Failed to delete payment method");
    console.error(err);
    throw err;
  }
}

export const getPaymentMethods = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/payment/payment-methods`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to get payment methods");
  }
};
