import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";

function RootLayout() {
  return (
    <>
      <Header />
      <main className="max-w-4xl gap-6 mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
