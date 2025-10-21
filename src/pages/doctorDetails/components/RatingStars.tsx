import { Star } from "lucide-react";

type RatingStarsProps = {
    rating: string;
};

function RatingStars({ rating }: RatingStarsProps) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    className={`fill-warning-100 text-warning-100 ${
                        i + 1 <= +rating ? "opacity-100" : "opacity-40"
                    }`}
                    size={20}
                />
            ))}
        </div>
    );
}

export default RatingStars;
