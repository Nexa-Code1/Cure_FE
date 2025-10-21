import { Star } from "lucide-react";
import reviews from "../../../assets/images/reviews.png";
export default function Reviews() {
  return (
    <>
      <div className="flex flex-col items-center py-10">
        <h2 className="text-xl md:text-3xl font-semibold">Reviews</h2>
        <h2 className="text-xl md:text-3xl font-semibold">
          That Speak for Themselves
        </h2>
        <div className="flex items-center gap-2 mt-10 mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={20}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
        <p className="text-secondary-300 md:w-1/2 lg:w-1/4 text-center">
          “Quick and easy booking! I found a great dermatologist near me and
          booked an appointment in just a few minutes.”
        </p>
        <div className="my-10">
          <img src={reviews} alt="reviews" />
        </div>
      </div>
    </>
  );
}
