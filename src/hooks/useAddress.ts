import { useEffect, useState } from "react";

import { geoCodeToAddress } from "@/api/location/location";
import type { GeoCodeMapsResult } from "@/types";

export function useAddress(lat: string, lng: string) {
    const [address, setAddress] = useState<GeoCodeMapsResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await geoCodeToAddress(lat, lng);
                setAddress(res);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { address, isLoading };
}
