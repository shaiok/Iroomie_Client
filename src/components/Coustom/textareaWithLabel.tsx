import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import React from "react";

type TextareaWithLabelProps = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  placeholder?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaWithLabel: React.FC<TextareaWithLabelProps> = ({
  id,
  label,
  icon,
  placeholder,
  ...props
}) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="flex gap-2 items-center">
        {icon && icon}
        <Label htmlFor={id}>{label}</Label>
      </div>
      <Textarea id={id} placeholder={placeholder} {...props} />
    </div>
  );
};

export default TextareaWithLabel;
