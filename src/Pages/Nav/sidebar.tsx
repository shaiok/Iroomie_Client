import  { useContext, useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "../../components/ui/sidebar-component";
import {
  IconBrandTabler,
  IconUserBolt,
  IconBrandMessenger,
  IconInbox,
  IconSettings,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../../lib/http";
import IroomieLogo from "../../components/Coustom/MyLogo";

interface Link {
  label: string;
  href: string;
  icon: JSX.Element;
}

export default function SidebarDemo() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext is not provided");
  }

  const { user, setUser } = context;

  const logoutMutation = useMutation({
    mutationFn: auth.logout,
    onSuccess: () => {
      setUser(undefined); // Updated from null to undefined
      navigate("/auth");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const links: Link[] = [
    {
      label: "My Profile",
      href: "/profile",
      icon: (
        <IconUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Discover",
      href: "/discover",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Preferences",
      href: "/preferences",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "My Activity",
      href: "/activity",
      icon: (
        <IconInbox className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Chat",
      href: "/chat",
      icon: (
        <IconBrandMessenger className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col xl:flex-row bg-gray-50 w-full flex-1 mx-auto ",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody>
          <div className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto">
              <IroomieLogo />
              <div className="mt-8 flex flex-col gap-4">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>

            {user && (
              <div>
                <div className="flex items-center mb-4">
                  <img
                    src={user.picture}
                    alt={user.fullName}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900 rounded-md transition-colors duration-150 ease-in-out"
                >
                  <IconLogout className="h-5 w-5 mr-2" />
                  {logoutMutation.isPending ? "Signing out..." : "Sign out"}
                </button>
              </div>
            )}
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex xl:flex-1 ">
      <div className="relative p-2 xl:p-10 overflow-y-auto border border-neutral-200 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};