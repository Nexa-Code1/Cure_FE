import { useState } from "react";
import { Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFormattedDate, getInitials } from "@/lib/utils";
import type { IReview } from "@/types";
import userPlaceholder from "@/assets/images/user-placeholder.png";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type ReviewCardProps = {
    review: IReview;
};

function ReviewCard({ review }: ReviewCardProps) {
    const [userImg, setUserImg] = useState(
        review.user?.image || userPlaceholder
    );

    return (
        <Card className="min-w-80 flex-1">
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-secondary-100 overflow-hidden">
                        <AvatarImage
                            src={userImg}
                            onError={() => setUserImg(userPlaceholder)}
                        />
                        <AvatarFallback>
                            {getInitials(review.user?.fullname)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2 font-medium">
                        <p className="text-primary-200">
                            {review.user?.fullname}
                        </p>
                        <p className="text-secondary-600 text-sm">
                            {getFormattedDate(review.created_at)}
                        </p>
                    </div>
                </CardTitle>
                <CardDescription className="w-fit px-2 py-1 rounded-md bg-yellow-50 text-warning-100 flex items-center gap-1">
                    <Star
                        className="fill-warning-100 text-warning-100"
                        size={16}
                    />
                    <span className="font-semibold ">
                        {review.rate.toFixed(1)}
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-secondary-500 font-medium">
                    {review.comment}
                </p>
            </CardContent>
        </Card>
    );
}

export default ReviewCard;
