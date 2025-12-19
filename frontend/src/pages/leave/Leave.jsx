import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyLeave, fetchMyLeaves } from "../../store/leaveSlice";

const Leave = () => {
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.leave.list);

  const userId = "64b000000000000000000001";

  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  useEffect(() => {
    dispatch(fetchMyLeaves(userId));
  }, [dispatch, userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(applyLeave({ ...formData, userId }));
    setFormData({ fromDate: "", toDate: "", reason: "" });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-10">
      {/* Leave Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Apply for Leave
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Apply Leave
          </button>
        </div>
      </div>

      {/* Leave List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">My Leaves</h2>

        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">From</th>
              <th className="border px-3 py-2 text-left">To</th>
              <th className="border px-3 py-2 text-left">Reason</th>
              <th className="border px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td className="border px-3 py-2">
                  {leave.fromDate.slice(0, 10)}
                </td>
                <td className="border px-3 py-2">
                  {leave.toDate.slice(0, 10)}
                </td>
                <td className="border px-3 py-2">{leave.reason}</td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      leave.status === "approved"
                        ? "bg-green-600"
                        : leave.status === "rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leave;
