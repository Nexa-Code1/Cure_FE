import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import getStart1 from "../../../assets/images/getstart1.png";
import BsHeartPulse from "../../../assets/images/BsHeartPulse.png";

export default function GetStart() {
  const navigate = useNavigate();
  return (
    <div className="h-screen overflow-hidden relative">
      <img
        className="relative top-15 left-10 w-10 h-10"
        src={BsHeartPulse}
        alt="Logo"
      />

      <div className="flex items-center flex-col lg:flex-row justify-center h-screen lg:h-full w-full max-w-[1000px] mx-auto">
        <div className="flex items-center justify-center lg:w-1/2">
          <img src={getStart1} className="w-[80%]" alt="image" />
        </div>

        <div className="flex flex-col gap-4 w-[90%] lg:w-1/2">
          <h1 className="text-2xl font-bold">Book Your Appointment Easily</h1>
          <p className="text-gray-500">
            Choose your preferred doctor, pick a suitable time, and confirm your
            visit in just a few taps. No calls, no waiting—just simple and fast
            booking.
          </p>
          <Button onClick={() => navigate("/get-start2")} className="w-1/2">
            Next
          </Button>
          <div className="flex items-center gap-1">
            <Link
              to="/get-start"
              className="w-10 h-3 rounded-full bg-primary"
            ></Link>
            <Link
              to="/get-start2"
              className="w-3 h-3 rounded-full bg-gray-400"
            ></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
