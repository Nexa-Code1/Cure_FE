import {
    handleAddFavorite,
    handleGetFavorites,
    handleRemoveFavorite,
} from "@/api/favourite/favourite";
import type { IFavouriteDoctor } from "@/types";
import { useEffect, useState } from "react";

export function useFavourites() {
    const [favouritesIDs, setFavouritesIDs] = useState<string[]>([]);
    const [allFavourites, setAllFavourites] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFavourites = async () => {
        try {
            setLoading(true);
            const favourites = await handleGetFavorites();
            setAllFavourites(favourites);
            setFavouritesIDs(favourites.map((f: IFavouriteDoctor) => f.id));
        } catch (error) {
            console.error("Fetch favourites error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavourites();
    }, []);

    const toggleFavourite = async (doctorId: string) => {
        if (favouritesIDs.includes(doctorId)) {
            await handleRemoveFavorite(doctorId.toString());
        } else {
            await handleAddFavorite(doctorId.toString());
        }
        await fetchFavourites();
    };

    return { favouritesIDs, toggleFavourite, allFavourites, loading };
}
