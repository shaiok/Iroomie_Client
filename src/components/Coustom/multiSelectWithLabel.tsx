import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface MultiSelectWithLabelProps {
  label: string;
  icon?: React.ReactNode;
  options: string[];
  value: Record<string, boolean>;
  onChange: (section: string, option: string, isChecked: boolean) => void;
  section: string;
}

const MultiSelectWithLabel: React.FC<MultiSelectWithLabelProps> = ({
  label,
  icon,
  options,
  value,
  onChange,
  section,
}) => {
  const handleToggle = (option: string) => {
    onChange(section, option, !value[option]);
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="flex gap-2 items-center mb-2">
        {icon && icon}
        <Label className="text-lg font-semibold">{label}</Label>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={option}
              checked={value[option]}
              onCheckedChange={() => handleToggle(option)}
            />
            <label
              htmlFor={option}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectWithLabel;
