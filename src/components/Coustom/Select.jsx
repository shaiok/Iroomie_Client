import React from "react";
import { MenuItem } from "@mui/material";
import Input from "./Input";

export default function SelectOptions({
  label,
  subLabel = "",
  icon,
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  ...props
}) {
  return (
    <Input
      select
      label={label}
      value={value}
      onChange={onChange}
      icon={icon}
      disabled={disabled}
      SelectProps={{
        displayEmpty: true,
        renderValue: (selected) => {
          if (selected === "") {
            return <span style={{ color: disabled ? "rgba(0, 0, 0, 0.87)" : "rgba(0, 0, 0, 0.5)" }}>{placeholder}</span>;
          }
          return <span style={{ color: "rgba(0, 0, 0, 0.87)" }}>{selected}</span>;
        },
      }}
      {...props}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Input>
  );
}