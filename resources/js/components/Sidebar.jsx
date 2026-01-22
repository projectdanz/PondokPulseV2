import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SIDEBAR_MENU } from "../constants/SidebarMenu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const Sidebar = () => {
    const data = localStorage.getItem("data");
    const location = useLocation();

    if (!data) return null;

    const user = JSON.parse(data);
    const role = user.user.role;
    const menus = SIDEBAR_MENU[role] || [];

    const [openSubMenu, setOpenSubMenu] = useState(null);

    const toggleSubMenu = (id) => {
        setOpenSubMenu(openSubMenu === id ? null : id);
    };

    return (
        <aside className="w-64 min-h-screen bg-[#061E29] text-[#F3F4F4] px-6 py-8">
            <div className="text-2xl font-bold mb-10">Pondok Pulse</div>
            <nav className="flex flex-col gap-3">
                {menus.map((menu) => (
                    <div key={menu.id}>
                        {menu.children ? (
                            <div>
                                <button
                                    onClick={() => toggleSubMenu(menu.id)}
                                    className={`w-full flex justify-between items-center px-4 py-2 rounded-lg hover:bg-[#1D546D] transition-colors ${
                                        menu.children.some(
                                            (child) =>
                                                location.pathname ===
                                                child.path,
                                        )
                                            ? "bg-[#1D546D]/50"
                                            : ""
                                    }`}
                                >
                                    <span>{menu.label}</span>
                                    {openSubMenu === menu.id ? (
                                        <FaChevronUp className="text-xs" />
                                    ) : (
                                        <FaChevronDown className="text-xs" />
                                    )}
                                </button>
                                {openSubMenu === menu.id && (
                                    <div className="flex flex-col gap-2 mt-2 ml-4 border-l-2 border-[#1D546D] pl-2">
                                        {menu.children.map((child) => (
                                            <NavLink
                                                key={child.id}
                                                to={child.path}
                                                className={({ isActive }) =>
                                                    `block px-4 py-1.5 rounded-lg text-sm transition-colors ${
                                                        isActive
                                                            ? "bg-[#1D546D]"
                                                            : "hover:bg-[#1D546D]/30"
                                                    }`
                                                }
                                            >
                                                {child.label}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink
                                to={menu.path}
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-lg transition-colors ${
                                        isActive
                                            ? "bg-[#1D546D]"
                                            : "hover:bg-[#1D546D]/30"
                                    }`
                                }
                            >
                                {menu.label}
                            </NavLink>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
