import React, { useState, useCallback } from "react";
import { debounce } from "@mui/material/utils";
import ComboboxWithLabel from "./comboboxWithLabel";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { fetchLocations } from "../../lib/LocationService";

type Location = {
  title: string;
  fullAddress: string;
  geometry: {
    coordinates: [number, number]; // This is the correct type for coordinates
  };
};

interface LocationComboboxProps {
  onChange: (location: { address: string; position: [number, number] } | null) => void;
  label?: string;
  placeholder?: string;
  initialValue?: string;
}

const LocationCombobox: React.FC<LocationComboboxProps> = ({
  onChange,
  label = "Address",
  placeholder = "Enter an address",
  initialValue = "",
}) => {
  const [options, setOptions] = useState<Location[]>([]);
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const debouncedFetch = useCallback(
    debounce(async (request: string) => {
      if (request.length < 3) {
        setOptions([]);
        return;
      }
      const results: Location[] = await fetchLocations(request);
      setOptions(results);
    }, 400),
    []
  );

  const handleInputChange = (newInputValue: string) => {
    setInputValue(newInputValue);
    debouncedFetch(newInputValue);
  };

  const handleLocationChange = (newValue: string) => {
    const selectedLocation = options.find((option) => option.title === newValue);
    if (selectedLocation) {
      // Ensure position is passed as [latitude, longitude]
      onChange({
        address: selectedLocation.fullAddress,
        position: [
          selectedLocation.geometry.coordinates[1], // latitude
          selectedLocation.geometry.coordinates[0], // longitude
        ], // Ensure the order is [latitude, longitude] as expected
      });
    } else {
      onChange(null);
    }
    setInputValue(newValue);
  };

  return (
    <ComboboxWithLabel
      id="location-search"
      label={label}
      icon={<RoomOutlinedIcon />}
      options={options.map((option) => option.title)} // Pass only the titles to the combobox
      placeholder={placeholder}
      value={inputValue}
      onChange={handleLocationChange}
      onInputChange={handleInputChange}
    />
  );
};

export default LocationCombobox;
