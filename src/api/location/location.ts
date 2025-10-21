import axios from "axios";

export async function geoCodeToAddress(lat: string, lng: string) {
    try {
        const res = await axios.get(
            `${
                import.meta.env.VITE_GEOCODE_MAPS_URL
            }?lat=${lat}&lon=${lng}&api_key=${
                import.meta.env.VITE_GEOCODE_MAPS_KEY
            }`
        );

        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
