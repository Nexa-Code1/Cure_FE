import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Ellipse from "../../../assets/images/Ellipse.png";
import VeryBigEllipse from "../../../assets/images/VeryBigEllipse.png";
import BigEllipse from "../../../assets/images/BigEllipse.png";
import Ellipse1 from "../../../assets/images/Ellipse1.png";
import Ellipse2 from "../../../assets/images/Ellipse2.png";
import Ellipse3 from "../../../assets/images/Ellipse3.png";
import { Button } from "@/components/ui/button";
import { CalendarRange, ChevronLeft, MapPin } from "lucide-react";

export default function Hero() {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-col h-[70vh] gap-6 items-center justify-center relative">
                {/* Very Big Ellipse (behind content but above VeryBigEllipse) */}
                <div className="absolute hidden lg:block z-0">
                    <img
                        src={VeryBigEllipse}
                        alt="Very Big Ellipse"
                        className="min-w-[1400px]"
                    />
                </div>

                {/* Middle Big Ellipse (behind content but above VeryBigEllipse) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                    <img
                        src={BigEllipse}
                        alt="Big Ellipse"
                        className="min-w-[800px]"
                    />
                    {/* Floating Book Now Button */}
                    <div className="absolute hidden md:flex rotate-40 items-center justify-center top-[60%] right-20 lg:-right-10 z-20">
                        <ChevronLeft className="bg-white text-primary w-10 h-10" />
                        <p className="py-1 bg-secondary-100 px-5 rounded-full text-sm">
                            Book Now
                        </p>
                    </div>
                    <div className="absolute hidden md:flex flex-col gap-2 items-center justify-center top-[20%] -left-8 z-20">
                        <MapPin className="bg-white text-white w-10 h-10 fill-primary" />
                        <p className="py-1 bg-secondary-100 px-5 rounded-full text-sm">
                            Doctors near you
                        </p>
                    </div>
                </div>

                {/* Content (inside smallest ellipse) */}
                <div className="flex flex-col gap-4 items-center justify-center relative z-40 text-center">
                    {/* Smallest Ellipse (content wrapper background) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                        <img
                            src={Ellipse}
                            alt="Small Ellipse"
                            className="min-w-[400px]"
                        />
                    </div>
                    <div className="py-1 px-5 bg-primary/10 flex items-center justify-center gap-2 rounded-full z-40">
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 15 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.5 5L6.83334 4L9.5 2.999L10.5 0.333344L11.5009 2.999L14.1667 4L11.5009 5L10.5 7.66666L9.5 5ZM4.16666 10.3333L0.833344 9L4.16666 7.66666L5.5 4.33334L6.83334 7.66666L10.1667 9L6.83334 10.3333L5.5 13.6667L4.16666 10.3333Z"
                                fill="#145DB8"
                            />
                        </svg>
                        <p className="text-md">Upgrade your account</p>
                    </div>

                    <h1 className="text-lg md:text-4xl z-40">
                        Find and book top doctors near you
                    </h1>

                    <p className="w-[80%] lg:w-[52%] text-sm md:text-xl text-secondary-400 z-40">
                        Easily find top-rated specialists near you and book
                        appointments in just a few clicks. Whether you need an
                        in-person visit consultation, we're here to connect you
                        with the right care—fast, simple, and secure.
                    </p>

                    <div className="py-2 px-5 bg-primary/10 flex items-center justify-center gap-4 rounded-full z-40">
                        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
                            <Avatar>
                                <AvatarImage src={Ellipse1} alt="@shadcn" />
                            </Avatar>
                            <Avatar>
                                <AvatarImage src={Ellipse2} alt="@leerob" />
                            </Avatar>
                            <Avatar>
                                <AvatarImage src={Ellipse3} alt="@evilrabbit" />
                            </Avatar>
                        </div>
                        <p className="text-md">10k+ happy patients</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 z-40">
                        <Button className="bg-primary text-white px-5 py-2 rounded-md w-[200px] hover:bg-white hover:text-primary border hover:border-primary">
                            Get Started
                        </Button>
                        <Button
                            className="bg-white text-primary px-5 py-2 rounded-md border border-primary flex gap-2 items-center w-[200px] hover:bg-primary hover:text-white"
                            onClick={() => navigate("/search")}
                        >
                            <CalendarRange size={18} />
                            Book Appointment
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
