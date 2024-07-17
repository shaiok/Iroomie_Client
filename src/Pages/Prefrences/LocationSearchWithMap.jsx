import React, { useState, useEffect } from "react";
import LocationSearch from "./LocationSearch";
import RadiusInputSlider from "./RadiusInputSlider";
import { Circle } from "react-leaflet";
import MapContent from "@/components/Coustom/MapContent";

const LocationSearchWithMap = ({ onAddressChange, onRadiusChange , withRadius , css, placeholder }) => {
  const [location, setLocation] = useState({
    address: "",
    position: null,
  });
  const [radius, setRadius] = useState(0);
  const [mapCenter, setMapCenter] = useState([32.0853, 34.7818]);
  const [mapKey, setMapKey] = useState(0);
  const [mapZoom, setMapZoom] = useState(14);
  

  const handleLocationChange = (newLocation) => { 
    if (newLocation.address === "") {
      setLocation({ address: "", position: null });
      setMapCenter([32.0853, 34.7818]);
      setMapKey((prevKey) => prevKey + 1); 
      onAddressChange({ address: "", position: null });
      setMapZoom(14);
      return;
    }
    setLocation(newLocation);
    setMapZoom(17);

    if (newLocation.position) {
      setMapCenter(newLocation.position);
      setMapKey((prevKey) => prevKey + 1); 
    }
    onAddressChange(newLocation);
  };

  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
    onRadiusChange(newRadius);
  };

  useEffect(() => {
    if (location.position) {
      setMapCenter(location.position);
    }
  }, [location]);
  
//border rounded-lg
  return (
    <div className={`flex flex-col gap-4 h-fit ` + css}> 
      <LocationSearch onLocationChange={handleLocationChange} placeholder={placeholder} />
      {withRadius && <RadiusInputSlider
        value={radius}
        onChange={handleRadiusChange}
        min={0}
        max={2000}
        step={100}
      />}
      <div className="relative z-0 rounded-md overflow-hidden">
        <MapContent
          key={mapKey}
          center={mapCenter}
          zoom={mapZoom}
          markers={
            location.position
              ? [{ position: location.position, popupText: location.address }]
              :
              []
              
          }
        >
          {(location.position && withRadius) && (
            <Circle
              center={location.position}
              radius={radius}
              pathOptions={{
                color: "blue",
                fillColor: "blue",
                fillOpacity: 0.2,
              }}
            />
          )}
        </MapContent>
      </div>
    </div>
  );
};

export default LocationSearchWithMap;
