import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

const AmenityCard = ({ name, icon: Icon, isSelected, onToggle }) => (
  <motion.div
    onClick={onToggle}
    className={`flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
      isSelected
        ? "bg-[#1976D2] text-white"
        : "bg-white text-gray-800 hover:bg-gray-100"
    }`}
  >
    <Icon />
    <span className="text-sm font-medium text-center">{name}</span>
  </motion.div>
);

const CheckboxesOptions = ({ list, selected, onChange }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
    
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 j">
        {list.map(({ name, id, icon }) => (
          <AmenityCard
            key={id}
            name={name}
            icon={icon}
            isSelected={selected[id]}
            onToggle={() => onChange(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckboxesOptions;
