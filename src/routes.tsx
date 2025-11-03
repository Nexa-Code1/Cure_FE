import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/layout/Layout";
import {
  Home,
  Search,
  GetStart,
  GetStart2,
  SignUp,
  SignIn,
  ForgetPassword,
  VerifyOTP,
  ResetPassword,
  FAQsPage,
  ProfileScreen,
  PrivacyPage,
  Notifications,
  Favourite,
  DoctorDetails,
  Appointments,
  Review,
  EditProfilePage,
  SettingsPage,
  PasswordManagementPage,
  PaymentListPage,
  AddNewCardPage,
  NotFound,
  MapSearch,
  ContactUs,
  Error,
  ProtectedRoute,
} from "./pages/index";
import { UserContextProvider } from "./context/user-context";

export const router = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  {
    path: "/get-start",
    element: <GetStart />,
  },
  {
    path: "/get-start2",
    element: <GetStart2 />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOTP />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/",
    element: (
      <UserContextProvider>
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      </UserContextProvider>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "/doctors/:doctorId",
        element: <DoctorDetails />,
      },
      {
        path: "/appointments",
        element: <Appointments />,
      },
      {
        path: "/profile",
        element: <ProfileScreen />,
      },
      {
        path: "/faqs",
        element: <FAQsPage />,
      },
      {
        path: "/privacy",
        element: <PrivacyPage />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/doctors/:doctorId/review",
        element: <Review />,
      },
      {
        path: "/edit-profile",
        element: <EditProfilePage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/password-management",
        element: <PasswordManagementPage />,
      },
      {
        path: "/payment-list",
        element: <PaymentListPage />,
      },
      {
        path: "/add-card",
        element: <AddNewCardPage />,
      },
      {
        path: "/favourite",
        element: <Favourite />,
      },
      {
        path: "/search-map",
        element: <MapSearch />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
    ],
  },
]);
