"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "../../lib/utils";
import { Check, X } from "lucide-react";

// Typing for Switch component props
interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitives.Root> {
  className?: string;
  checked?: boolean;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(({ className, checked, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ",
      "disabled:cursor-not-allowed disabled:opacity-50 ",
      checked ? "bg-blue-500" : "bg-gray-200",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none flex items-center justify-center h-5 w-5 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    >
      {checked ? (
        <Check className="h-3 w-3 text-blue-500" />
      ) : (
        <X className="h-3 w-3 text-red-500" />
      )}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
