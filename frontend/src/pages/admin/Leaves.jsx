import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllLeaves,
  updateLeaveStatus,
} from "../../store/adminSlice";

const AdminLeaves = () => {
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.admin.leaves);

  useEffect(() => {
    dispatch(fetchAllLeaves());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">Leave Requests</h2>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Employee</th>
            <th className="border px-3 py-2">From</th>
            <th className="border px-3 py-2">To</th>
            <th className="border px-3 py-2">Reason</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((l) => (
            <tr key={l._id}>
              <td className="border px-3 py-2">
                {l.userId?.name}
              </td>
              <td className="border px-3 py-2">{l.fromDate}</td>
              <td className="border px-3 py-2">{l.toDate}</td>
              <td className="border px-3 py-2">{l.reason}</td>
              <td className="border px-3 py-2 capitalize">{l.status}</td>
              <td className="border px-3 py-2 space-x-2">
                {l.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        dispatch(
                          updateLeaveStatus({
                            id: l._id,
                            status: "approved",
                          })
                        )
                      }
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        dispatch(
                          updateLeaveStatus({
                            id: l._id,
                            status: "rejected",
                          })
                        )
                      }
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLeaves;
