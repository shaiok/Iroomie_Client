import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "../../lib/utils";

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  color?: string; // e.g., "blue-500"
  isMin?: boolean;
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, color = "blue-500", isMin = false, ...props }, ref) => {
    const thumbCount = Array.isArray(props.value) ? props.value.length : 1;

    // Precompute classes for dynamic Tailwind compatibility
   // const trackColor = isMin ? `bg-${color}` : "bg-gray-200";
   // const rangeColor = isMin ? "bg-gray-200" : `bg-${color}`;
    const thumbBorderColor = `border-${color}`;

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full items-center", className)}
        {...props}
      >
        <SliderPrimitive.Track
          className={cn(
            "relative h-[0.2rem] w-full grow overflow-hidden rounded-full",
            isMin ? `bg-${color}` : "bg-gray-200"
          )}
        >
          <SliderPrimitive.Range
            className={cn("absolute h-full", isMin ? "bg-gray-200" : `bg-${color}`)}
          />
        </SliderPrimitive.Track>
        {[...Array(thumbCount)].map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className={cn(
              "block lg:h-4 lg:w-4 h-4 w-4 rounded-full border-2 bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              thumbBorderColor
            )}
          />
        ))}
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
