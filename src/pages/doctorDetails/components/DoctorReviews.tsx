import { Link } from "react-router-dom";

import { Pencil } from "lucide-react";
import RatingStars from "./RatingStars";
import ReviewCard from "./ReviewCard";
import type { IReview } from "@/types";
import AlertMsg from "@/components/common/AlertMsg";
import { useUserContext } from "@/context/user-context";

type DoctorReviewsProps = {
    doctorId: number;
    reviews: IReview[];
    rating: string;
};

function DoctorReviews({ doctorId, reviews, rating }: DoctorReviewsProps) {
    const { user } = useUserContext();
    const hasCurUserReview = reviews.some(
        (review) => review.user_id === user?.id
    );

    return (
        <section className="mt-8 flex flex-col gap-4 flex-1">
            <header className="flex items-center justify-between">
                <h2 className="font-medium text-lg">Reviews and Rating</h2>
                {!hasCurUserReview && (
                    <Link
                        to={`/doctors/${doctorId}/review`}
                        className="flex items-center gap-1 cursor-pointer text-primary-100 hover:text-primary-200 focus:text-primary-200"
                    >
                        <Pencil size={18} />
                        <span>add review</span>
                    </Link>
                )}
            </header>

            <div className="flex items-center justify-between gap-2">
                <p className="text-3xl font-medium">
                    {Number(rating).toFixed(1)}/5
                </p>
                <div className="flex flex-col items-center gap-1">
                    <RatingStars rating={rating} />
                    <p className="text-secondary-400 font-medium text-base">
                        {reviews.length} Reviews
                    </p>
                </div>
            </div>

            <div className="w-full h-[350px] flex flex-col items-center justify-center">
                {reviews && reviews.length > 0 ? (
                    <>
                        <div className="flex flex-wrap items-center justify-between gap-4 overflow-y-auto pr-2">
                            {reviews.map((review: IReview) => (
                                <ReviewCard review={review} key={review.id} />
                            ))}
                        </div>
                    </>
                ) : reviews && reviews.length === 0 ? (
                    <AlertMsg message="No reviews found" />
                ) : (
                    <AlertMsg message="Something went wrong. Cannot get reviews" />
                )}
            </div>
        </section>
    );
}

export default DoctorReviews;
