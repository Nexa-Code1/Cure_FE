import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  addReview,
  getDoctorDetails,
  updateReview,
} from "@/api/doctors/doctors";
import GoBackButton from "@/components/common/GoBackButton";
import type { IReview } from "@/types";
import { useUserContext } from "@/context/user-context";
import PageLoader from "@/components/common/PageLoader";
import AlertMsg from "@/components/common/AlertMsg";

export default function ReviewPage() {
  const { user } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [prevReview, setPrevReview] = useState<IReview | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const display = hover ?? rating;
  const { doctorId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        if (!user) return;
        if (!doctorId)
          throw new Error(
            "Invalid doctor id. Cannot find doctor. Please check the url again."
          );
        const res = await getDoctorDetails(doctorId);
        const userPrevReview = res.reviews.find(
          (review: IReview) => review.user.id === user.id
        );

        setRating(userPrevReview.rate);
        setComment(userPrevReview.comment);
        setPrevReview(userPrevReview);
      } catch (error) {
        const e = error as AxiosError<{ message?: string }>;
        setError(
          e?.response?.data.message || "Something went wrong. Cannot get review"
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user]);

  if (isLoading) return <PageLoader />;
  if (!isLoading && error)
    return <AlertMsg message={error || "Doctor is not found."} />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      if (!doctorId)
        throw new Error(
          "Invalid doctor id. Cannot find doctor. Please check the url again."
        );
      const reviewData = {
        doctorId,
        rating,
        comment,
      };

      if (prevReview) {
        const res = await updateReview(reviewData, prevReview.id);
        if (res.status === 201) toast.success("Updated review successfully");
      } else {
        const res = await addReview(reviewData);
        if (res.status === 201) toast.success("Added review successfully");
      }
      setOpen(true);
      navigate(-1);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("An unexpected error occurred. Cannot make a review.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full">
        <div className="flex items-center gap-2 py-3 md:py-4">
          <GoBackButton />
          <h1 className="mx-auto font-semibold text-zinc-900 text-xl">
            Review
          </h1>
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
                          active ? "text-yellow-400" : "text-zinc-300"
                        }`}
                        fill={active ? "#FACC15" : "none"}
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
              {prevReview ? "Update your review" : "Send your review"}
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
