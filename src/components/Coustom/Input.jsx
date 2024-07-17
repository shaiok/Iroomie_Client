import React from "react";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

export default function Input({
  label,
  placeholder,
  type,
  icon,
  disabled = false,
  InputProps,
  SelectProps,
  ...props
}) {
  return (
    <TextField
      label={label}
      placeholder={disabled ? "" : placeholder}
      type={type}
      disabled={disabled}
      InputProps={{
        ...InputProps,
        startAdornment: icon && (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
      SelectProps={{
        ...SelectProps,
        IconComponent: disabled ? () => null : undefined,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: ".5rem",
          "& fieldset": {
            borderRadius: ".5rem",
          },
          "&.Mui-disabled": {
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.23)", // Regular border color
            },
            "& input": {
              WebkitTextFillColor: "rgba(0, 0, 0, 0.87)", // Regular text color
              color: "rgba(0, 0, 0, 0.87)", // Regular text color
            },
            "& .MuiSelect-select": {
              WebkitTextFillColor: "rgba(0, 0, 0, 0.87)", // Regular text color for select
              color: "rgba(0, 0, 0, 0.87)", // Regular text color for select
              paddingRight: "14px !important", // Remove extra padding when there's no arrow
            },
          },
        },
        "& .MuiInputLabel-root.Mui-disabled": {
          color: "rgba(0, 0, 0, 0.6)", // Regular label color
        },
      }}
      fullWidth
      {...props}
    />
  );
}