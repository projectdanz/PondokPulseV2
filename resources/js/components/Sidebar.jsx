import { NavLink } from "react-router-dom";
import { SIDEBAR_MENU } from "../constants/SidebarMenu";
import Button from "./Button";

const Sidebar = () => {
  const data = localStorage.getItem("data")

  if(!data) return null;

  const user = JSON.parse(data)
  const role = user.user.role
  const menus = SIDEBAR_MENU[role] || [];

  return (
    <aside className="w-64 min-h-screen bg-[#061E29] text-[#F3F4F4] px-6 py-8">
      <div className="text-2xl font-bold mb-10">
        Pondok Pulse
      </div>
      <nav className="flex flex-col gap-3">
      {menus.map((menu) => (
          <NavLink
          key={menu.id}
          to={menu.path}
          className={({isActive}) => 
            `block px-4 py-2 rounded-lg ${isActive ? "bg-[#1D546D]" : ""}`
        }
        >
            {menu.label}
        </NavLink>
      ))}
      </nav>
    </aside>
  );
};

export default Sidebar;