import { NavLink } from "react-router-dom";

export default function NavMenu({ isMenuOpen }) {
  return (
    <div
      className={`w-full md:flex md:w-auto md:order-1 overflow-hidden ${
        isMenuOpen
          ? "max-h-screen opacity-100 transition-all duration-700"
          : "max-h-0 opacity-0 md:opacity-100 md:max-h-full"
      }`}
    >
      <ul className="flex flex-row gap-8 md:gap-24 font-medium justify-center p-4">
        {["discover", "preferences", "inbox" ].map((item, index) => (
          <NavLink key={index} to={`/${item}`} className="capitalize">
            {item}
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
