import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendanceHistory } from "../../store/punchSlice";

const AttendanceHistory = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.punch.history);

  useEffect(() => {
    dispatch(fetchAttendanceHistory());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow rounded p-6">
      <h2 className="text-2xl font-semibold mb-6">Attendance History</h2>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Date</th>
            <th className="border px-3 py-2 text-left">Punch In</th>
            <th className="border px-3 py-2 text-left">Punch Out</th>
            <th className="border px-3 py-2 text-left">Hours</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item._id}>
              <td className="border px-3 py-2">
                {item.date}
              </td>
              <td className="border px-3 py-2">
                {item.punchIn
                  ? new Date(item.punchIn).toLocaleTimeString()
                  : "--"}
              </td>
              <td className="border px-3 py-2">
                {item.punchOut
                  ? new Date(item.punchOut).toLocaleTimeString()
                  : "--"}
              </td>
              <td className="border px-3 py-2">
                {item.workingHours || "--"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceHistory;
