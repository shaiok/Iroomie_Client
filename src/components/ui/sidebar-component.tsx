import React, { useState, createContext, useContext, ReactNode, MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import IroomieLogo from "../Coustom/MyLogo";

// Utility function (replace with your actual implementation)
const cn = (...classes: (string | undefined)[]): string => classes.filter(Boolean).join(" ");

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: SidebarProviderProps): JSX.Element => {
  const [openState, setOpenState] = useState<boolean>(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

interface SidebarProps {
  children: ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}

export const Sidebar = ({ children, open, setOpen, animate }: SidebarProps): JSX.Element => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

interface SidebarBodyProps {
  children: ReactNode;
}

export const SidebarBody = ({ children }: SidebarBodyProps): JSX.Element => {
  return (
    <>
      <DesktopSidebar>{children}</DesktopSidebar>
      <MobileSidebar>{children}</MobileSidebar>
    </>
  );
};

interface SidebarComponentProps {
  className?: string;
  children: ReactNode;
}

export const DesktopSidebar = ({ className, children, ...props }: SidebarComponentProps): JSX.Element => {
  return (
    <motion.div
      className={cn(
        "h-full px-4 py-4 hidden xl:flex xl:flex-col bg-neutral-100w-fit flex-shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({ className, children, ...props }: SidebarComponentProps): JSX.Element => {
  const { open, setOpen } = useSidebar();

  return (
    <>
      <div
        className={cn(
          "h-20 px-4 py-4 flex flex-row xl:hidden items-baseline justify-between bg-neutral-100 w-full "
        )}
        {...props}
      >
        <div className="flex justify-between items-center z-20 w-full ">
          <IroomieLogo logo={false} />
          {open && <IconX onClick={() => setOpen(!open)} />}
          {!open && <IconMenu2 onClick={() => setOpen(!open)} />}
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-fit inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

interface SidebarLinkProps {
  link: {
    href: string;
    label: string;
    icon: JSX.Element;
  };
  className?: string;
}

export const SidebarLink = ({ link, className, ...props }: SidebarLinkProps): JSX.Element => {
  const { open, setOpen, animate } = useSidebar();
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(!open);
    navigate(link.href);
  };

  return (
    <a
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </a>
  );
};
