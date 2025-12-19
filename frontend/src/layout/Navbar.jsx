import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import { useSelector } from "react-redux";




const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="w-full bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
  <div className="flex gap-6">
    <Link to="/">Home</Link>
    <Link to="/punch">Punch</Link>
    <Link to="/leave">Leave</Link>
    <Link to="/attendance-history">Attendance History</Link>
   {user?.role === "admin" && (
  <>
    <Link to="/admin">Admin</Link>
    <Link to="/admin/leaves">Leave Requests</Link>
    <Link to="/admin/users">Employees</Link>
    <Link to="/admin/attendance">Attendance</Link>
  </>
)}

  </div>

  {isAuth && <Profile />}
</nav>
  );
};

export default Navbar;
