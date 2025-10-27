import PageLoader from "@/components/common/PageLoader";
import CardDoctor from "../../components/common/CardDoctor";
import GoBackButton from "../../components/common/GoBackButton";
import { useFavourites } from "../../hooks/useFavourite";
import type { IFavouriteDoctor } from "../../types";
import noFavourite from "@/assets/images/no-favorite.png";

export default function Favourite() {
    const { allFavourites, toggleFavourite, loading } = useFavourites();

    return (
        <div>
            <div className="flex items-center gap-2">
                <GoBackButton />
                <h1 className="text-2xl font-semibold flex-1 text-center">
                    Your Favourite
                </h1>
            </div>

            {loading ? (
                <PageLoader />
            ) : allFavourites.length === 0 ? (
                <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                    <img src={noFavourite} alt="image" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 md:py-6 lg:py-10">
                    {allFavourites?.map((favourite: IFavouriteDoctor) => (
                        <CardDoctor
                            key={favourite.id}
                            doctor={favourite}
                            onToggleFavourite={() =>
                                toggleFavourite(favourite.id)
                            }
                            isFavourite={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
