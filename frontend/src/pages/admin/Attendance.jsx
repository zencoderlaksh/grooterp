import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAttendance } from "../../store/adminSlice";

const AdminAttendance = () => {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.admin.attendance);

  useEffect(() => {
    dispatch(fetchAllAttendance());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">Attendance (All Employees)</h2>
      <a
  href="http://localhost:5000/api/admin/attendance/export"
  className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block"
>
  Export CSV
</a>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Employee</th>
            <th className="border px-3 py-2">Date</th>
            <th className="border px-3 py-2">Punch In</th>
            <th className="border px-3 py-2">Punch Out</th>
            <th className="border px-3 py-2">Hours</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a) => (
            <tr key={a._id}>
              <td className="border px-3 py-2">
                {a.userId?.name}
              </td>
              <td className="border px-3 py-2">{a.date}</td>
              <td className="border px-3 py-2">
                {a.punchIn
                  ? new Date(a.punchIn).toLocaleTimeString()
                  : "--"}
              </td>
              <td className="border px-3 py-2">
                {a.punchOut
                  ? new Date(a.punchOut).toLocaleTimeString()
                  : "--"}
              </td>
              <td className="border px-3 py-2">
                {a.workingHours || "--"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAttendance;
