import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { resetPunch } from "../store/punchSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
   dispatch(resetPunch());
dispatch(logout());
navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-white">
        {user.name}
      </span>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-3 py-1 text-sm rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
