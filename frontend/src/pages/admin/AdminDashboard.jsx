import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import gsap from "gsap";

import {
  fetchAllUsers,
  fetchAllLeaves,
  fetchAllAttendance,
} from "../../store/adminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const titleRef = useRef(null);

  /* Redux data */
  const { users, leaves, attendance } = useSelector(
    (state) => state.admin
  );

  /* Fetch admin data */
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllLeaves());
    dispatch(fetchAllAttendance());
  }, [dispatch]);

  /* GSAP – title animation */
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    );
  }, []);

  /* Framer Motion variants */
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  /* Derived metrics */
  const pendingLeaves = leaves.filter(
    (l) => l.status === "pending"
  ).length;

  const today = new Date().toDateString();
  const todayAttendance = attendance.filter(
    (a) => new Date(a.date).toDateString() === today
  ).length;

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <div ref={titleRef}>
        <h1 className="text-2xl font-semibold text-[#000080]">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Overview of system activity
        </p>
      </div>

      {/* Stats Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: "Total Users", value: users.length },
          { label: "Today Attendance", value: todayAttendance },
          { label: "Total Leaves", value: leaves.length },
          { label: "Pending Leaves", value: pendingLeaves },
        ].map((item) => (
          <motion.div
            key={item.label}
            variants={card}
            className="bg-white p-5 rounded-lg shadow"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-semibold text-[#0047AB]">
              {item.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Leaves */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h3 className="text-lg font-medium text-[#0047AB] mb-3">
          Recent Leave Requests
        </h3>

        <ul className="space-y-2 text-sm text-gray-600">
          {leaves.length ? (
            leaves.slice(0, 5).map((leave) => (
              <li key={leave._id}>
                ✔ {leave.user?.name} –{" "}
                <span
                  className={`font-medium ${
                    leave.status === "approved"
                      ? "text-green-600"
                      : leave.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {leave.status}
                </span>
              </li>
            ))
          ) : (
            <li>No leave requests</li>
          )}
        </ul>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
