import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Home,
  Clock,
  CalendarDays,
  ClipboardList,
  Users,
  BarChart3,
  LayoutDashboard,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const navItem = (to, label, Icon) => {
    const active = location.pathname === to;

    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2 rounded transition
          ${active ? "bg-[#0047AB]" : "hover:bg-[#0047AB]/70"}`}
      >
        <Icon size={20} />
        {!collapsed && <span>{label}</span>}
      </Link>
    );
  };

  return (
    <div
      className={`h-screen bg-[#000080] text-white transition-all duration-300
      ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <span className="font-bold text-lg">GrootERP</span>
        )}
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-2">
        {navItem("/", "Home", Home)}
        {navItem("/punch", "Punch", Clock)}
        {navItem("/leave", "Leave", CalendarDays)}
        {navItem("/attendance-history", "Attendance", ClipboardList)}

        {user?.role === "admin" && (
          <>
            <div className="mt-2 text-xs text-gray-300 px-3">
              {!collapsed && "Admin"}
            </div>

            {navItem("/admin", "Dashboard", LayoutDashboard)}
            {navItem("/admin/users", "Users", Users)}
            {navItem("/admin/attendance", "Attendance", ClipboardList)}
            {navItem("/admin/leaves", "Leaves", CalendarDays)}
            {navItem("/admin/charts", "Charts", BarChart3)}
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
