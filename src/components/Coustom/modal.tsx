import React, { useState, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "../../components/ui/drawer";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { cn } from "../../lib/utils";

type VoteType = "like" | "dislike" | "match";

type ModalProps = {
  dataId: string;
  children: ReactNode;
  isOpen: boolean;
  vote: VoteType;
  onOpenChange: (isOpen: boolean) => void;
  onAction: (dataId: string, action: VoteType) => void;
};

const getAnimationClass = (modalAnimated: VoteType | null): string => {
  if (!modalAnimated || modalAnimated === "match") return "";

  return modalAnimated === "like"
    ? "translate-x-full opacity-0 rotate-12"
    : "-translate-x-full opacity-0 -rotate-12";
};

const Modal: React.FC<ModalProps> = ({
  dataId,
  children,
  isOpen,
  vote,
  onOpenChange,
  onAction,
}) => {
  const [modalAnimated, setModalAnimated] = useState<VoteType | null>(null);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const handleSwipe = (action: VoteType) => {
    onAction(dataId, action);
    setModalAnimated(action);
    setTimeout(() => {
      onOpenChange(false);
      setTimeout(() => setModalAnimated(null), 300);
    }, 300);
  };

  const ModalContent = isDesktop ? DialogContent : DrawerContent;
  const ModalWrapper = isDesktop ? Dialog : Drawer;
  const ModalTitle = isDesktop ? DialogTitle : DrawerTitle;
  const ModalDescription = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <ModalWrapper open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent
        className={cn(
          "max-w-5xl h-[90vh] md:overflow-auto transition-all ease-in-out",
          "duration-300",
          getAnimationClass(modalAnimated)
        )}
      >
        <ModalTitle children={undefined} />
        <ModalDescription children={undefined} />
        <div className="h-full w-full p-4 relative">
          {children}
          {vote === "match" && (
            <div className="sticky bottom-4 left-0 right-0 flex justify-center space-x-4 p-4">
              <button
                onClick={() => handleSwipe("dislike")}
                className="bg-red-500 text-white p-4 rounded-full"
              >
                <ThumbDownIcon />
              </button>
              <button className="bg-blue-500 text-white p-4 rounded-full">
                <SendOutlinedIcon />
              </button>
            </div>
          )}
          {vote !== "match" && (
            <div className="sticky bottom-4 left-0 right-0 flex justify-center space-x-4 p-4">
              {vote !== "dislike" && (
                <button
                  onClick={() => handleSwipe("dislike")}
                  className="bg-red-500 text-white p-4 rounded-full"
                >
                  <ThumbDownIcon />
                </button>
              )}
              {vote !== "like" && (
                <button
                  onClick={() => handleSwipe("like")}
                  className="bg-green-500 text-white p-4 rounded-full"
                >
                  <ThumbUpIcon />
                </button>
              )}
            </div>
          )}
        </div>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
