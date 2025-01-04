export interface LocationFeature {
  id: string;
  title: string;
  fullAddress: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

export const fetchLocations = async (query: string): Promise<LocationFeature[]> => {
  if (query.length < 3) return [];
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(
    query
  )}&limit=100&lang=en&lat=31.0461&lon=34.8516&layer=city&layer=street`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Filter for locations in Israel and remove duplicates
    const uniqueLocations = new Map<string, LocationFeature>();
    data.features.forEach((feature: any) => {
      if (feature.properties.country === "Israel" && feature.properties.city) {
        const key = `${feature.properties.name}, ${feature.properties.city}`.toLowerCase();
        if (!uniqueLocations.has(key)) {
          uniqueLocations.set(key, {
            id: `${feature.properties.name}-${feature.properties.city}-${feature.geometry.coordinates.join("-")}`,
            title: `${feature.properties.name}, ${feature.properties.city}`,
            fullAddress: `${feature.properties.name}, ${feature.properties.city}`,
            geometry: feature.geometry,
          });
        }
      }
    });

    // Convert to array and sort alphabetically
    return Array.from(uniqueLocations.values()).sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } catch (error) {
    console.error("Error fetching data from Photon API:", error);
    return [];
  }
};
