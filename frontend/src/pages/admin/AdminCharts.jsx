import { useSelector } from "react-redux";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const COLORS = ["#0047AB", "#82C8E5", "#6D8196"];

const AdminCharts = () => {
  const { attendance, leaves } = useSelector((state) => state.admin);

  // Attendance per day
  const attendanceByDate = Object.values(
    attendance.reduce((acc, cur) => {
      const date = new Date(cur.date).toLocaleDateString();
      acc[date] = acc[date] || { date, count: 0 };
      acc[date].count += 1;
      return acc;
    }, {})
  );

  // Leave status distribution
  const leaveStats = ["approved", "pending", "rejected"].map((status) => ({
    name: status,
    value: leaves.filter((l) => l.status === status).length,
  }));

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-[#000080]">
        Analytics
      </h2>

      {/* Attendance Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="mb-4 font-medium">Daily Attendance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceByDate}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#0047AB" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Leave Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="mb-4 font-medium">Leave Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={leaveStats} dataKey="value" nameKey="name" label>
              {leaveStats.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminCharts;
