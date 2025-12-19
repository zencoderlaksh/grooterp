import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../store/adminSlice";


const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
  console.log("Admin users:", users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">Employees</h2>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Name</th>
            <th className="border px-3 py-2 text-left">Email</th>
            <th className="border px-3 py-2 text-left">Role</th>
            <th className="border px-3 py-2 text-left">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border px-3 py-2">{u.name}</td>
              <td className="border px-3 py-2">{u.email}</td>
              <td className="border px-3 py-2 capitalize">{u.role}</td>
              <td className="border px-3 py-2">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
