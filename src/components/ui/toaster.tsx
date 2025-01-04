import React from "react";
import { useToast } from "../ui/usetoast";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  [key: string]: any; // Add this to handle any additional properties
}

const Toaster: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div>
      {toasts.map(({ id, title, description, action, ...props }: Toast) => (
        <div key={id} {...props}>
          <h4>{title}</h4>
          <p>{description}</p>
          {action}
        </div>
      ))}
    </div>
  );
};

export default Toaster;