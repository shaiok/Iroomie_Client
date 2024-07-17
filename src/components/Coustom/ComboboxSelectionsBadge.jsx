import React, { useState, useMemo, useRef, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Input from "./Input";

export default function ComboboxSelectionsBadge({
  label,
  list = {},
  icon,
  selected,
  onChange,
  placeholder,
  previewOnly = false,
}) {
  const [selectedAmenities, setSelectedAmenities] = useState([...selected]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  const filteredOptions = useMemo(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    return Object.fromEntries(
      Object.entries(list)
        .map(([category, items]) => [
          category,
          items.filter(
            (item) =>
              item.toLowerCase().includes(lowercasedTerm) &&
              !selectedAmenities.includes(item)
          ),
        ])
        .filter(([, items]) => items.length > 0)
    );
  }, [searchTerm, selectedAmenities]);

  const handleAddAmenity = (amenity) => {
    if (!selectedAmenities.includes(amenity)) {
      setSelectedAmenities((prev) => [...prev, amenity]);
    }
    onChange([...selectedAmenities, amenity]);
  };

  const handleDeleteAmenity = (amenity) => {
    setSelectedAmenities((prev) => prev.filter((item) => item !== amenity));
    onChange(selectedAmenities.filter((item) => item !== amenity));
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div className="w-full mx-auto relative" ref={searchRef}>
      {!previewOnly && (
        <Input
          label={label}
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          icon={icon}
          placeholder={placeholder}
        />
      )}

      {!previewOnly && isFocused && (
        <div className="absolute left-0 right-0 z-40 bg-white shadow-lg rounded-md p-4 mt-2 max-h-[300px] overflow-auto">
          {Object.entries(filteredOptions).map(([category, amenities]) => (
            <div key={category} className="mb-4">
              <Typography variant="subtitle1" className="mb-2">
                {category}
              </Typography>
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity) => (
                  <Chip
                    key={amenity}
                    label={amenity}
                    onClick={() => handleAddAmenity(amenity)}
                    color="info"
                    variant="outlined"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedAmenities.length > 0 && (
        <div className={`h-fit overflow-auto ${ !previewOnly && "border rounded-sm p-4 mt-2" }`}>
          <div className="flex flex-wrap gap-2">
            {selectedAmenities.map((amenity) => (
              <Chip
                deleteIcon={previewOnly ? null : undefined}
                key={amenity}
                label={amenity}
                {...(previewOnly
                  ? {}
                  : { onDelete: () => handleDeleteAmenity(amenity) }
                )}
                color="primary"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
