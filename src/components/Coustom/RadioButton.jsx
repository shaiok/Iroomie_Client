import React from "react";

export default function RadioButton({
  id,
  label,
  icon,
  checked,
  handleSelection,
  name
}) {
  return (
    <div className="relative">
      <input
        type="radio"
        id={id}
        name={name}
        value={label}
        className="hidden peer"
        checked={checked}
        onChange={handleSelection}
      />
      <label
        htmlFor={id}
        className={`flex flex-col gap-4 items-center justify-center p-4 w-full bg-white border-2 rounded-lg cursor-pointer
          transition-all duration-200 ease-in-out
          peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50
          text-center
          ${icon ? "h-full " : "h-16 items-center"}
          `}
          >
        {icon && <div className="flex justify-end items-center">{icon}</div>}
        <div className="text-sm font-medium lg:text-lg  text-center">{label}</div>
      </label>
    </div>
  );
}
