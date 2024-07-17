import React from "react";
import Slider from "@mui/material/Slider";

export default function SliderValues({
  value,
  onChange,
  labels,
  min,
  max,
  step,
  title,
  sliderColor,
  thumbColor,
  thumbBorderColor,
}) {
  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <div className="flex flex-col text-lg lg:text-xl capitalize justify-center h-full px-1">
      <p className="font-bold mx-2">{title}</p>

      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleSliderChange}
        sx={{
          color: sliderColor,
          height: 8,
          "& .MuiSlider-thumb": {
            height: 27,
            width: 27,
            backgroundColor: thumbColor,
            border: `1.5px solid ${thumbBorderColor}`,
          },
        }}
      />
      <p className="font-thin mx-2">{labels[value] || ""}</p>
    </div>
  );
}
