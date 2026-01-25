import { Heart } from "lucide-react";
import GoBackButton from "@/components/common/GoBackButton";
import { Loader } from "@/components/common/Loader";
import { useFavourites } from "@/hooks/useFavourite";

type PageHeaderProps = {
    title: string;
    doctorId: string;
    className?: string;
};

function PageHeader({ title, className, doctorId }: PageHeaderProps) {
    const {
        favouritesIDs,
        toggleFavourite,
        loading: isLikeLoading,
    } = useFavourites();

    const isDoctorFavourite = favouritesIDs.includes(doctorId);

    return (
        <header
            className={`flex items-center justify-between h-fit ${className}`}
        >
            <GoBackButton />
            <h1 className="font-semibold text-lg flex-1">{title}</h1>
            {isLikeLoading ? (
                <Loader />
            ) : (
                <button
                    type="button"
                    title="Heart"
                    className="hover:scale-110 transition-transform cursor-pointer"
                    onClick={() => toggleFavourite(doctorId)}
                >
                    <Heart
                        strokeWidth={1.3}
                        className={
                            isDoctorFavourite
                                ? "fill-error-500 stroke-error-500"
                                : "stroke-secondary-600"
                        }
                    />
                </button>
            )}
        </header>
    );
}

export default PageHeader;
