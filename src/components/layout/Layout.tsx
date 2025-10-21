import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../common/ScrollToTop";

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full max-w-[1240px] mx-auto p-4 md:py-6 lg:py-10 min-h-screen overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
