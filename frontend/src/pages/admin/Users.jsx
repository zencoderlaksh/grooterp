import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../store/adminSlice";
import { MaterialReactTable } from "material-react-table";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // get current month range
  const getMonthRange = () => {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .slice(0, 10);
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .slice(0, 10);
    return { from, to };
  };

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "role", header: "Role" },
      {
        accessorKey: "createdAt",
        header: "Joined",
        Cell: ({ cell }) =>
          new Date(cell.getValue()).toLocaleDateString(),
      },
    ],
    []
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-[#000080] mb-4">
        Employees
      </h2>

      <MaterialReactTable
        columns={columns}
        data={users}
        enableGlobalFilter
        enableSorting
        enablePagination
        enableRowActions
        renderRowActions={({ row }) => {
          const { from, to } = getMonthRange();

          return (
            <button
              onClick={() =>
                window.open(
                  `/admin/salary/${row.original._id}?from=${from}&to=${to}`,
                  "_blank"
                )
              }
              className="text-blue-600 text-sm"
            >
              Salary Slip
            </button>
          );
        }}
      />
    </div>
  );
};

export default Users;
