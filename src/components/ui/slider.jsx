import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef(({ className, thumbSize = 8 , trackSize = 6, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className={`relative lg:h-${trackSize} h-2 w-full grow overflow-hidden rounded-full bg-gray-500`}>
      <SliderPrimitive.Range className="absolute h-full bg-green-700" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={`block lg:h-${thumbSize} lg:w-${thumbSize} h-4 w-4 rounded-full border-2 border-green-700 
    bg-background transition-colors focus-visible:outline-none 
    focus-visible:ring-2 focus-visible:ring-ring 
    focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
