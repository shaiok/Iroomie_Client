import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./Pages/Nav/Navigator";
import ApartmentInfo from "./Pages/Profile/Apartment/ApartmentInfo";
import Filter from "./Pages/Prefrences/Filter";
import Login from "./Pages/Login/Login";
import RegistrationProcess from "./Pages/Register/RegistrationProcess";
import DiscoverRoot from "./Pages/Discover/DiscoverRoot";
import DiscoverList from "./Pages/Discover/DiscoverList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "discover",
        element: <DiscoverList />,
      },
      { path: "preferences", element: <Filter /> },
      { path: "inbox", element: <p>z</p> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <RegistrationProcess /> },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
