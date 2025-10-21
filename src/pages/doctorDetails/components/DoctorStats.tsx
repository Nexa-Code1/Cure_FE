import { Award, MessageSquareMore, Star, User } from "lucide-react";
import StatItem from "./StatItem";

type DoctorStatsProps = {
    experienceYears: number;
    reviewsCount: number;
    rating: string;
    patients: number;
};

function DoctorStats({
    experienceYears,
    reviewsCount,
    rating,
    patients,
}: DoctorStatsProps) {
    return (
        <section className="flex items-center justify-between gap-4 my-8">
            <StatItem Icon={User} value={patients} label="patients" />
            <StatItem Icon={Award} value={experienceYears} label="experience" />
            <StatItem
                Icon={Star}
                value={Number(rating).toFixed(1)}
                label="rating"
            />
            <StatItem
                Icon={MessageSquareMore}
                value={reviewsCount}
                label="reviews"
            />
        </section>
    );
}

export default DoctorStats;
