import { useState } from "react";
import MenuToggle from "./MenuToggle";
import AvatarDropdown from "./AvatarDropdown";
import NavMenu from "./NavMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className={`bg-muted/85 transition-all duration-500 ${isMenuOpen ? "rounded-b-3xl" : "md:rounded-b-none"}`}>
      <div className="max-w-screen-2xl flex flex-wrap gap-2 items-center justify-between mx-auto p-4">
        <MenuToggle toggleMenu={toggleMenu} />
        <a>LOGO</a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0">
          <AvatarDropdown isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />
        </div>
        <NavMenu isMenuOpen={isMenuOpen} />
      </div>
    </nav>
  );
}
