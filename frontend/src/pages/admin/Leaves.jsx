import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLeaves, updateLeaveStatus } from "../../store/adminSlice";
import { MaterialReactTable } from "material-react-table";
import { Button } from "@mui/material";

const AdminLeaves = () => {
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.admin.leaves);

  useEffect(() => {
    dispatch(fetchAllLeaves());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "userId.name",
        header: "Employee",
      },
      {
        accessorKey: "fromDate",
        header: "From",
      },
      {
        accessorKey: "toDate",
        header: "To",
      },
      {
        accessorKey: "reason",
        header: "Reason",
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => (
          <span className="capitalize">{cell.getValue()}</span>
        ),
      },
      {
        header: "Action",
        Cell: ({ row }) =>
          row.original.status === "pending" && (
            <div className="flex gap-2">
              <Button
                size="small"
                color="success"
                onClick={() =>
                  dispatch(
                    updateLeaveStatus({
                      id: row.original._id,
                      status: "approved",
                    })
                  )
                }
              >
                Approve
              </Button>

              <Button
                size="small"
                color="error"
                onClick={() =>
                  dispatch(
                    updateLeaveStatus({
                      id: row.original._id,
                      status: "rejected",
                    })
                  )
                }
              >
                Reject
              </Button>
            </div>
          ),
      },
    ],
    [dispatch]
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-[#000080] mb-4">
        Leave Requests
      </h2>

      <MaterialReactTable
        columns={columns}
        data={leaves}
        enableGlobalFilter
        enableSorting
        enablePagination
      />
    </div>
  );
};

export default AdminLeaves;
