import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import getStart2 from "../../../assets/images/getstart2.png";
import BsHeartPulse from "../../../assets/images/BsHeartPulse.png";
import GoBackButton from "../../../components/common/GoBackButton";

export default function GetStart2() {
  const navigate = useNavigate();
  return (
    <div className="h-screen overflow-hidden relative">
      <div className="absolute top-30 left-12">
        <GoBackButton />
      </div>
      <img
        className="relative top-15 left-10 w-10 h-10"
        src={BsHeartPulse}
        alt="Logo"
      />

      <div className="flex items-center flex-col gap-14 lg:gap-0 lg:flex-row justify-center h-screen lg:h-full w-full max-w-[1000px] mx-auto">
        <div className="flex items-center justify-center lg:w-1/2">
          <img src={getStart2} className="w-[60%]" alt="image" />
        </div>

        <div className="flex flex-col gap-4 w-[90%] lg:w-1/2">
          <h1 className="text-3xl font-bold">Find Doctors Around You</h1>
          <p className="text-gray-500">
            Quickly discover trusted doctors near your area. Whether you need a
            general checkup or a specialist, we connect you with nearby clinics
            for fast and convenient care.
          </p>
          <Button onClick={() => navigate("/sign-in")} className="w-1/2">
            Get Started
          </Button>
          <div className="flex items-center gap-1">
            <Link
              to="/get-start"
              className="w-3 h-3 rounded-full bg-gray-400"
            ></Link>
            <Link
              to="/get-start2"
              className="w-10 h-3 rounded-full bg-primary"
            ></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
