import * as React from "react";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

interface GenericDrawerProps {
  triggerButton?: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  contentClassName?: string;
}

export const GenericDrawer: React.FC<GenericDrawerProps> = ({
  triggerButton,
  title,
  description,
  children,
  footer,
  contentClassName = "lg:container",
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {triggerButton || <Button variant="outline">Open Drawer</Button>}
      </DrawerTrigger>
      <DrawerContent>
        <div className={contentClassName}>
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          <div className="p-2 pb-0">{children}</div>
          {footer && <DrawerFooter>{footer}</DrawerFooter>}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
