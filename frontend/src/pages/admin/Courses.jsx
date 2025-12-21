import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../store/courseSlice";
import { MaterialReactTable } from "material-react-table";

const Courses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((s) => s.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  const columns = [
    { accessorKey: "name", header: "Course" },
    { accessorKey: "durationMonths", header: "Duration (Months)" },
    { accessorKey: "totalFees", header: "Fees" }
  ];

  return <MaterialReactTable columns={columns} data={courses} />;
};

export default Courses;
