import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef(
  ({ className, color = "blue-500", ...props }, ref) => {
    const thumbCount = Array.isArray(props.value) ? props.value.length : 1;
console.log("SliderPrimitive", color)
    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full items-center", className)}
        {...props}
      >
        <SliderPrimitive.Track
          className={`relative h-[0.2rem] w-full grow overflow-hidden rounded-full bg-gray-500`}
        >
          <SliderPrimitive.Range
            className={cn("absolute h-full ", "bg-" + color)}
          />
        </SliderPrimitive.Track>
        {[...Array(thumbCount)].map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className={cn(
              `block lg:h-4 lg:w-4 h-4 w-4 rounded-full border-2 
          bg-background transition-colors focus-visible:outline-none 
          focus-visible:ring-2 focus-visible:ring-ring 
          focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
              "border-" + color
            )}
          />
        ))}
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
