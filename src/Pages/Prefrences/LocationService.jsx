export const fetchLocations = async (query) => {
    if (query.length < 3) return [];
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(
      query
    )}&limit=10&lang=en&lat=31.0461&lon=34.8516&layer=city&layer=street`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.features.map((feature) => ({
        id: `${feature.properties.name}-${feature.properties.city}-${feature.geometry.coordinates.join('-')}`,
        description: `${feature.properties.name}, ${feature.properties.city}`,
        structured_formatting: {
          main_text: feature.properties.name,
          secondary_text: [
            feature.properties.city,
            feature.properties.state,
            feature.properties.country,
          ]
            .filter(Boolean)
            .join(", "),
        },
        geometry: feature.geometry,
      }));
    } catch (error) {
      console.error("Error fetching data from Photon API:", error);
      return [];
    }
  };