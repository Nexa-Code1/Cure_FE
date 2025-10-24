import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { ChevronLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { addReview } from "@/api/doctors/doctors";

export default function ReviewPage() {
    const [rating, setRating] = React.useState<number>(0);
    const [hover, setHover] = React.useState<number | null>(null);
    const [comment, setComment] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const display = hover ?? rating;
    const { doctorId } = useParams();
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await addReview({
                doctorId: Number(doctorId),
                rating,
                comment: comment,
            });
            console.log(res);

            if (res.status === 201) toast.success("Added review successfully");
            setOpen(true);
            navigate(`/doctors/${doctorId}`);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(
                    "An unexpected error occurred. Cannot make an appointment."
                );
            }
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl px-4 md:px-6">
                <div className="flex items-center gap-2 py-3 md:py-4">
                    <button
                        type="button"
                        aria-label="Back"
                        className="-ml-2 rounded-full p-2 hover:bg-zinc-100"
                    >
                        <ChevronLeft
                            className="h-5 w-5 text-zinc-700 sm:h-6 sm:w-6"
                            onClick={() => navigate(-1)}
                        />
                    </button>
                    <h1 className="mx-auto font-semibold text-zinc-900 text-lg sm:text-xl md:text-2xl">
                        Review
                    </h1>
                    <div className="w-9 sm:w-10" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="pb-10">
                    <section className="mt-1 md:mt-2">
                        <p className="text-sm md:text-base font-semibold text-zinc-900">
                            Your Rate
                        </p>
                        <div className="mt-2 md:mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 md:gap-2">
                                {[1, 2, 3, 4, 5].map((i) => {
                                    const active = i <= display;
                                    return (
                                        <button
                                            key={i}
                                            type="button"
                                            className="p-0.5"
                                            onMouseEnter={() => setHover(i)}
                                            onMouseLeave={() => setHover(null)}
                                            onClick={() => setRating(i)}
                                            aria-label={`Rate ${i} of 5`}
                                        >
                                            <Star
                                                className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${
                                                    active
                                                        ? "text-yellow-400"
                                                        : "text-zinc-300"
                                                }`}
                                                fill={
                                                    active ? "#FACC15" : "none"
                                                }
                                                strokeWidth={1.5}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="select-none text-2xl sm:text-3xl font-semibold text-zinc-900">
                                {display}/5
                            </div>
                        </div>
                    </section>

                    {/* review */}
                    <section className="mt-6 md:mt-8">
                        <p className="text-sm md:text-base font-semibold text-zinc-900">
                            Your review
                        </p>
                        <textarea
                            className="mt-2 h-40 sm:h-44 md:h-48 w-full resize-none rounded-2xl border border-zinc-300 px-4 py-3 text-sm md:text-base text-zinc-800 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                            placeholder="Write your review"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </section>

                    {/*  */}
                    <div className="mt-6 md:mt-8 mb-6">
                        <Button
                            type="submit"
                            className="w-full h-11 sm:h-12 rounded-xl text-sm sm:text-base bg-blue-600 hover:bg-blue-700"
                        >
                            Send your review
                        </Button>
                    </div>
                </form>
            </div>

            {/* dialog  */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    showCloseButton={false}
                    className="sm:max-w-md w-[90%] rounded-[28px] sm:rounded-[36px] border-0 bg-white px-6 sm:px-10 py-16 sm:py-20 text-center"
                >
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl sm:text-3xl font-medium text-zinc-900">
                            Thanks for your review
                        </DialogTitle>
                    </DialogHeader>

                    <DialogFooter className="mt-8 flex flex-col items-center gap-4">
                        <Button
                            onClick={() => setOpen(false)}
                            className="w-56 sm:w-64 h-12 sm:h-12 rounded-full bg-[#0B1A2C] hover:bg-[#0b1a2ccc] text-white text-base"
                        >
                            Done
                        </Button>

                        <button
                            type="button"
                            onClick={() => {
                                setOpen(false);
                            }}
                            className="text-sm text-zinc-500 hover:underline"
                        >
                            Back to Home
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
