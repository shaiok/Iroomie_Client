import React, { useState, useCallback } from "react";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { debounce } from "@mui/material/utils";
import { fetchLocations } from "./LocationService";
import { renderOption } from "./LocationUtils";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import Input from "@/components/Coustom/Input";

const LocationSearch = ({
  onLocationChange,
  label = "Address",
  placeholder,
  icon = <RoomOutlinedIcon />,
  disabled,
}) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const debouncedFetch = useCallback(
    debounce(async (request) => {
      const results = await fetchLocations(request);
      setOptions(results);
    }, 400),
    []
  );

  const handleChange = (event, newValue) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);
    handleLocationChange(newValue);
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    debouncedFetch(newInputValue);
  };

  const handleLocationChange = (newValue) => {
    if (newValue) {
      const { description, structured_formatting, geometry } = newValue;
      const fullAddress = `${structured_formatting.main_text}, ${structured_formatting.secondary_text.slice().split(",")[0]}`;
      onLocationChange({
        address: fullAddress,
        position: [geometry.coordinates[1], geometry.coordinates[0]],
      });
    } else {
      onLocationChange({ address: "", position: [32.0853, 34.7818] });
    }
  };

  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      disabled={disabled}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={handleChange}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <Input
          label={label}
          placeholder={placeholder}
          icon={icon}
          disabled={disabled} 
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                {icon && (
                  <InputAdornment position="start"><RoomOutlinedIcon /></InputAdornment>
                )}
                {params.InputProps.startAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={renderOption}
    />
  );
};

export default LocationSearch;
