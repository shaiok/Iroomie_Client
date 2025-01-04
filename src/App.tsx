import React, { useState, useEffect, createContext, ReactNode } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  IUser } from "./lib/interfaces";

//import Filter from "./Pages/Prefrences/Filter";

import RegistrationProcess from "./Pages/Register/RegisterProcess";
import { auth } from "./lib/http";
// @ts-ignore
import CardsList from "./Pages/Discover/cardsList";
// @ts-ignore
import MyProfile from "./Pages/MyProfile/myProfile";
// @ts-ignore
import SidebarDemo from "./Pages/Nav/sidebar";
// @ts-ignore
import Authentication from "./Pages/Auth/authentication";
// @ts-ignore
import PreferencesPage from "./Pages/Prefrences/preferencesPage";
// @ts-ignore
import MyActivity from "./Pages/Activity/myActivity";
// @ts-ignore
import Chat from "./Pages/Chat/chat";



// Define UserContextType
export interface UserContextType {
  user: IUser | undefined; // Allow undefined for initial state
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>; // Align with user state
}

// Create UserContext
export const UserContext = createContext<UserContextType | null>(null);

// Define ProtectedRoute component
const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("ProtectedRoute must be used within a UserContext.Provider");
  }

  const { user } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return user ? <>{children}</> : null;
};

// Define ProfileRoute component
const ProfileRoute: React.FC = () => {
  return <MyProfile />;
};

// Define router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <SidebarDemo />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/discover" replace />,
      },
      {
        path: "discover",
        element: <CardsList />,
      },
      {
        path: "preferences",
        element: <PreferencesPage />,
      },
      {
        path: "activity",
        element: <MyActivity />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "settings",
        element: <p>settings content</p>,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfileRoute />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Authentication />,
  },
  {
    path: "/complete-signup",
    element: <RegistrationProcess />,
  },
]);

// Create QueryClient
const queryClient = new QueryClient();

// Main App component
const App: React.FC = () => {
  const [user, setUser] = useState<IUser >();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const userData = await auth.currentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setUser(user);
      } finally {
        setLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
