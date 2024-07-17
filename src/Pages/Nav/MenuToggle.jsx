import { Menu } from "lucide-react";

export default function MenuToggle({ toggleMenu }) {
  return (
    <div className="md:hidden">
      <Menu className="h-6 w-6 cursor-pointer" onClick={toggleMenu} />
    </div>
  );
}
