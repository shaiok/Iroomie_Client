import React from "react";
import Slider from "@mui/material/Slider";
import Input from "@/components/Coustom/Input";

function RadiusInputSlider({ value, onChange , min, max, step}) {
  const handleInputChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 20) {
      onChange(newValue);
    }
  };

  const handleSliderChange = (_, newValue) => {
    onChange(newValue);
  };

  return (
    <div className="flex gap-8 items-center ">
      <Input
        label="Radius (sqm)"
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
      />
      <Slider
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        sx={{
          color: "#000000",
          height: 8,
          "& .MuiSlider-thumb": {
            height: 27,
            width: 27,
            backgroundColor: "#ffffff",
            border: "1.5px solid ",
          },
        }}
      />
    </div>
  );
}

export default RadiusInputSlider;