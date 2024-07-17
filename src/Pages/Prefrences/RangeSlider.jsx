import React from "react";
import Slider from "@mui/material/Slider";

function RangeSlider({
  value,
  onChange,
  label,
  min,
  max,
  step,
  type,
  color = "#000000",
  map = null,
}) {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-4 border p-4 rounded-lg">
      <label className="block text-lg font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <Slider
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        sx={{
          color: { color },
          height: 8,
          "& .MuiSlider-thumb": {
            height: 27,
            width: 27,
            backgroundColor: "#ffffff",
            border: "1.5px solid ",
          },
        }}
      />

      {!map && <div className="flex justify-between items-center mt-2 text-sm text-gray-700">
        <span>
          {type}
          {value[0].toLocaleString()}
        </span>
        <span>
          {type}
          {value[1]?.toLocaleString()}
        </span>
      </div>}
      
      {map && <div className="flex justify-center items-center mt-2 text-sm text-gray-700">
        <span>
          {type}
          {map[value[0]]}
        </span>
        
      </div>}
    </div>
  );
}

export default RangeSlider;
