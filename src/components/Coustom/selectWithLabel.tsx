import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

interface SelectWithLabelProps {
  label: string;
  icon?: React.ReactNode;
  options: string[];
  placeholder?: string;
  onChange: (value: string) => void;
  value?: string;
}

const SelectWithLabel: React.FC<SelectWithLabelProps> = ({
  label,
  icon,
  options,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="flex gap-2 items-center">
        {icon && icon}
        <Label>{label}</Label>
      </div>

      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectWithLabel;
