import { Link } from "react-router-dom";
const AdminDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Admin features will be added here.
      </p>
      <Link to="/admin/users" className="mt-2 text-gray-600">
        Users
      </Link>
    </div>
  );
};

export default AdminDashboard;
