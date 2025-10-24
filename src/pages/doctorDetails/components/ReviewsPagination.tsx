import { type Dispatch, type SetStateAction } from "react";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import type { IReviewsLink } from "@/types";

type ReviewsPaginationProps = {
    reviewsLinks: IReviewsLink[];
    lastPage: number;
    onSetReveiwLink: Dispatch<SetStateAction<string>>;
};

function ReviewsPagination({
    reviewsLinks,
    lastPage,
    onSetReveiwLink,
}: ReviewsPaginationProps) {
    return (
        <Pagination className="mt-6 text-base font-medium">
            <PaginationContent>
                {reviewsLinks[0].url && (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                onSetReveiwLink(reviewsLinks[0].url!)
                            }
                            className="text-base font-medium cursor-pointer"
                        />
                    </PaginationItem>
                )}

                {Array.from({ length: lastPage }, (_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={reviewsLinks[i + 1].active}
                            className="text-base font-light cursor-pointer"
                            onClick={() =>
                                onSetReveiwLink(reviewsLinks[i + 1].url!)
                            }
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {reviewsLinks.at(-1)!.url && (
                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                onSetReveiwLink(reviewsLinks.at(-1)!.url!)
                            }
                            className="text-base font-medium cursor-pointer"
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}

export default ReviewsPagination;
