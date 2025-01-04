import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  placeholder?: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  id,
  label,
  icon,
  placeholder,
  type = "text",
  ...props
}) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="flex gap-2 items-center">
        {icon && icon}
        <Label htmlFor={id}>{label}</Label>
      </div>
      <Input type={type} id={id} placeholder={placeholder} {...props} />
    </div>
  );
};

export default InputWithLabel;
