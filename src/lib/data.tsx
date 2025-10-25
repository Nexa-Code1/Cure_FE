import creditCardImg from "@/assets/images/credit-card.png";
import payPalImg from "@/assets/images/pay-pal.png";
import applePayImg from "@/assets/images/apple-pay.png";

export const countries = [
    { code: "EG", dial: "+20" },
    { code: "SA", dial: "+966" },
    { code: "AE", dial: "+971" },
] as const;

export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const paymentMethods = [
    {
        id: "credit-card",
        title: "Credit Cart",
        imgSrc: creditCardImg,
    },
    {
        id: "pay-pal",
        title: "PayPal",
        imgSrc: payPalImg,
    },
    {
        id: "apple-pay",
        title: "Apple Pay",
        imgSrc: applePayImg,
    },
];
