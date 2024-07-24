import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";

export default function DrawerDialogDemo({ children, triggerText }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="
        bg-transparent text-blue-500 font-normal flex justify-center group/modal-btn
        relative overflow-hidden  py-2 px-4 rounded-md
      "
          >
            <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
              {"View Details"}
            </span>
            <span className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500">
              <ChairOutlinedIcon />
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="w-11/12 max-w-5xl h-[90vh] overflow-y-auto">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
      <button
      className="
        bg-transparent text-blue-500 font-normal flex justify-center group/modal-btn
        relative overflow-hidden  py-2 px-4 rounded-md
      "
    >
      <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
        {'View Details'}
      </span>
      <span className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500">
        <ChairOutlinedIcon/>
      </span>
    </button>
      </DrawerTrigger>
      <DrawerContent className="overflow-auto ">{children}</DrawerContent>
    </Drawer>
  );
}
