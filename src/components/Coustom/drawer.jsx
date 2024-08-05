import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function GenericDrawer({
  triggerButton,
  title,
  description,
  children,
  footer,
  contentClassName = "container",
}) {
  return (
    <Drawer >
      <DrawerTrigger asChild>
        {triggerButton || <Button variant="outline">Open Drawer</Button>}
      </DrawerTrigger>
      <DrawerContent>
        <div className={contentClassName}>
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          <div className="p-4 pb-0">
            {children}
          </div>
          {footer && (
            <DrawerFooter>
              {footer}
            </DrawerFooter>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}