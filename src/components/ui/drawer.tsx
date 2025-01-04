import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "../../lib/utils";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: { shouldScaleBackground?: boolean; children?: React.ReactNode }) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger: React.FC<{ asChild?: boolean; children: React.ReactNode }> = ({
  asChild = false,
  children,
  ...props
}) => (
  <DrawerPrimitive.Trigger {...props} asChild={asChild}>
    {children}
  </DrawerPrimitive.Trigger>
);

const DrawerPortal: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}) => <DrawerPrimitive.Portal {...props}>{children}</DrawerPrimitive.Portal>;

const DrawerClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close> & { asChild?: boolean }
>(({ className, asChild, ...props }, ref) => (
  <DrawerPrimitive.Close
    ref={ref}
    asChild={asChild}
    className={cn("absolute top-4 right-4", className)}
    {...props}
  />
));
DrawerClose.displayName = DrawerPrimitive.Close.displayName;

const DrawerOverlay = React.forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, ...props }, ref) => (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-black/80", className)}
      {...props}
    />
  )
);
DrawerOverlay.displayName = "DrawerOverlay";

const DrawerContent = React.forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex flex-col rounded-t-[10px] border bg-background",
          "h-[90vh] max-h-[90vh] transition-transform duration-300",
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader: React.FC<{ className?: string; children: React.ReactNode }> =
  ({ className, children, ...props }) => (
    <div
      className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
      {...props}
    >
      {children}
    </div>
  );
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter: React.FC<{ className?: string; children: React.ReactNode }> =
  ({ className, children, ...props }) => (
    <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props}>
      {children}
    </div>
  );
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<HTMLDivElement, { className?: string; children: React.ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <DrawerPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </DrawerPrimitive.Title>
  )
);
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef<HTMLDivElement, { className?: string; children: React.ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <DrawerPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </DrawerPrimitive.Description>
  )
);
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
