import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAttendance } from "../../store/adminSlice";
import { MaterialReactTable } from "material-react-table";

const AdminAttendance = () => {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.admin.attendance);

  useEffect(() => {
    dispatch(fetchAllAttendance());
  }, [dispatch]);

  /* ---------------- EXPORT HANDLERS ---------------- */

  const handleExportAll = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/admin/attendance/export",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "attendance_all.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Failed to export attendance");
    }
  };

  const handleExportFaculty = async (userId, name) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/admin/attendance/export/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}_attendance.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Failed to export faculty attendance");
    }
  };

  /* ---------------- TABLE COLUMNS ---------------- */

  const columns = useMemo(
    () => [
      {
        accessorKey: "userId.name",
        header: "Employee",
      },
      {
        accessorKey: "date",
        header: "Date",
        Cell: ({ cell }) =>
          new Date(cell.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: "punchIn",
        header: "Punch In",
        Cell: ({ cell }) =>
          cell.getValue()
            ? new Date(cell.getValue()).toLocaleTimeString()
            : "--",
      },
      {
        accessorKey: "punchOut",
        header: "Punch Out",
        Cell: ({ cell }) =>
          cell.getValue()
            ? new Date(cell.getValue()).toLocaleTimeString()
            : "--",
      },
      {
        accessorKey: "workingHours",
        header: "Hours",
      },
    ],
    []
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#000080]">
          Attendance Overview
        </h2>

        <button
          onClick={handleExportAll}
          className="bg-[#0047AB] hover:bg-[#000080] text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      {/* TABLE */}
      <MaterialReactTable
        columns={columns}
        data={attendance}
        enableGlobalFilter
        enableSorting
        enableColumnFilters
        enablePagination
        enableRowActions
        initialState={{ density: "compact" }}
        renderRowActions={({ row }) => (
          <button
            onClick={() =>
              handleExportFaculty(
                row.original.userId._id,
                row.original.userId.name
              )
            }
            className="text-blue-600 text-sm"
          >
            Export Faculty
          </button>
        )}
      />
    </div>
  );
};

export default AdminAttendance;
