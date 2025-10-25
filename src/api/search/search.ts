import type { IDoctor } from "@/types";
import { geoCodeToAddress } from "../location/location";

// Function to fetch coordinates from address
export const fetchCoordinates = async (address: string) => {
<<<<<<< HEAD
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                address + " egypt"
            )}`
        );
        const data = await res.json();
        if (data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
=======
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address + " egypt"
      )}`
    );
    const data = await res.json();
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
>>>>>>> 23e2e2ee391a9ca1041c75b9ae3820bc9df92399
};

// Function to load Leaflet CSS and JS
export const loadLeafletAssets = (): Promise<void> => {
<<<<<<< HEAD
    return new Promise((resolve, reject) => {
        if ((window as any).L) {
            resolve();
            return;
        }

        // CSS
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
        link.crossOrigin = "";
        link.onerror = () => reject(new Error("Failed to load Leaflet CSS"));
        document.head.appendChild(link);

        // JS
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
        script.crossOrigin = "";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Leaflet JS"));
        document.body.appendChild(script);
    });
=======
  return new Promise((resolve, reject) => {
    if ((window as any).L) {
      resolve();
      return;
    }

    // CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
    link.crossOrigin = "";
    link.onerror = () => reject(new Error("Failed to load Leaflet CSS"));
    document.head.appendChild(link);

    // JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
    script.crossOrigin = "";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Leaflet JS"));
    document.body.appendChild(script);
  });
>>>>>>> 23e2e2ee391a9ca1041c75b9ae3820bc9df92399
};

// Function to initialize the map
export const initializeMap = async (
<<<<<<< HEAD
    doctors: IDoctor[],
    onMarkerClick: (doctor: IDoctor & { lat: number; lng: number }) => void
) => {
    try {
        await loadLeafletAssets();

        const L = (window as any).L;
        if (!L) {
            console.error("Leaflet not loaded");
            return null;
        }

        // Check if map container exists
        const mapContainer = document.getElementById("map");
        if (!mapContainer) {
            console.error("Map container not found");
            return null;
        }

        // Create map
        const map = L.map("map").setView([30.0444, 31.2357], 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        // Doctor icon
        const doctorIcon = L.icon({
            iconUrl:
                "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            shadowUrl:
                "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });

        const bounds = L.latLngBounds();
        let hasValidMarkers = false;

        // Process doctors sequentially to avoid rate limiting
        for (const doctor of doctors) {
            const coords = {
                lat: +doctor.address.x,
                lng: +doctor.address.y,
            };

            if (coords.lat && coords.lng) {
                const doctorAddress = await geoCodeToAddress(
                    coords.lat.toString(),
                    coords.lng.toString()
                );

                // Doctor marker
                const doctorMarker = L.marker([coords.lat, coords.lng], {
                    icon: doctorIcon,
                })
                    .addTo(map)
                    .on("click", () => {
                        onMarkerClick({ ...doctor, ...coords });
                        map.setView([coords.lat, coords.lng], 15);
                    });

                doctorMarker.bindPopup(
                    `<b>Dr. ${doctor.name}</b><br>${
                        doctorAddress.display_name ?? ""
                    }`
                );
                bounds.extend([coords.lat, coords.lng]);
                hasValidMarkers = true;
            }
        }

        // Fit bounds after all markers are added
        if (hasValidMarkers && bounds.isValid()) {
            setTimeout(() => {
                map.fitBounds(bounds, { padding: [20, 20] });
            }, 2000);
        } else {
            // Default view if no valid markers
            map.setView([30.0444, 31.2357], 10);
        }

        return map;
    } catch (error) {
        console.error("Error initializing map:", error);
        return null;
    }
};

// Update map view for selected doctor
export const updateMapView = async (
    map: any,
    doctor: IDoctor
): Promise<{ lat?: number; lng?: number }> => {
    if (!map) return {};

    const coords = { lat: +doctor.address.x, lng: +doctor.address.y };
    if (coords.lat && coords.lng) {
        map.setView([coords.lat, coords.lng], 15);

        // Open popup for this doctor
        map.eachLayer((layer: any) => {
            if (layer instanceof (window as any).L.Marker) {
                const latLng = layer.getLatLng();
                if (latLng.lat === coords.lat && latLng.lng === coords.lng) {
                    layer.openPopup();
                }
            }
        });
    }

    return coords;
=======
  doctors: IDoctor[],
  onMarkerClick: (doctor: IDoctor & { lat: number; lng: number }) => void,
  existingMap?: any
) => {
  try {
    await loadLeafletAssets();

    const L = (window as any).L;
    if (!L) {
      console.error("Leaflet not loaded");
      return null;
    }

    // Check if map container exists
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      console.error("Map container not found");
      return null;
    }

    // Create map
    const map = existingMap || L.map("map").setView([30.0444, 31.2357], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Doctor icon
    const doctorIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const bounds = L.latLngBounds();
    let hasValidMarkers = false;

    // Process doctors sequentially to avoid rate limiting
    for (const doctor of doctors) {
      const coords = {
        lat: +doctor.address.x,
        lng: +doctor.address.y,
      };

      if (coords.lat && coords.lng) {
        const doctorAddress = await geoCodeToAddress(
          coords.lat.toString(),
          coords.lng.toString()
        );

        // Doctor marker
        const doctorMarker = L.marker([coords.lat, coords.lng], {
          icon: doctorIcon,
        })
          .addTo(map)
          .on("click", () => {
            onMarkerClick({ ...doctor, ...coords });
            map.setView([coords.lat, coords.lng], 15);
          });

        doctorMarker.bindPopup(
          `<b>Dr. ${doctor.name}</b><br>${doctorAddress.display_name ?? ""}`
        );
        bounds.extend([coords.lat, coords.lng]);
        hasValidMarkers = true;
      }
    }

    // Fit bounds after all markers are added
    if (hasValidMarkers && bounds.isValid()) {
      setTimeout(() => {
        map.fitBounds(bounds, { padding: [20, 20] });
      }, 2000);
    } else {
      // Default view if no valid markers
      map.setView([30.0444, 31.2357], 10);
    }

    return map;
  } catch (error) {
    console.error("Error initializing map:", error);
    return null;
  }
};

export const updateMapView = async (
  map: any,
  doctor: IDoctor
): Promise<{ lat?: number; lng?: number }> => {
  if (!map || !doctor?.address) return {};

  const lat = Number(doctor.address.x);
  const lng = Number(doctor.address.y);

  if (isNaN(lat) || isNaN(lng)) return {};

  map.setView([lat, lng], 15);

  map.eachLayer((layer: any) => {
    if (layer instanceof (window as any).L.Marker) {
      const latLng = layer.getLatLng();
      if (latLng.lat === lat && latLng.lng === lng) {
        layer.openPopup();
      }
    }
  });

  return { lat, lng };
>>>>>>> 23e2e2ee391a9ca1041c75b9ae3820bc9df92399
};

// Cleanup function to remove map
export const cleanupMap = (map: any) => {
<<<<<<< HEAD
    if (map) {
        map.remove();
    }
=======
  if (map) {
    map.remove();
  }
>>>>>>> 23e2e2ee391a9ca1041c75b9ae3820bc9df92399
};
