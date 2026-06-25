import { NavLink } from "react-router-dom";

import {
  FaChartPie,
  FaUsers,
  FaMoneyBillWave,
  FaTags,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaChartPie />,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: <FaUsers />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <FaTags />,
    },
  ];

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">
          DS Properties
        </h1>

        <p className="text-slate-400 mt-2">
          Property Management
        </p>
      </div>

      <nav className="space-y-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-slate-800">
        <p className="text-slate-400 text-sm">
          Logged in as
        </p>

        <p className="font-semibold">
          Admin
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;