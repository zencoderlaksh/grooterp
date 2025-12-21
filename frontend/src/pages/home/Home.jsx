import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import gsap from "gsap";

import { fetchTodayPunch } from "../../store/punchSlice";
import { fetchMyLeaves } from "../../store/leaveSlice";

const Home = () => {
  const dispatch = useDispatch();
  const welcomeRef = useRef(null);

  /* Redux data */
  const { user } = useSelector((state) => state.auth);
  const { punchInTime, punchOutTime } = useSelector((state) => state.punch);
  const { list: leaves } = useSelector((state) => state.leave);

  /* Fetch real data */
  useEffect(() => {
    dispatch(fetchTodayPunch());
    if (user?._id) {
      dispatch(fetchMyLeaves(user._id));
    }
  }, [dispatch, user]);

  /* GSAP welcome animation */
  useEffect(() => {
    gsap.fromTo(
      welcomeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    );
  }, []);

  /* Framer Motion variants */
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const card = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div ref={welcomeRef}>
        <h1 className="text-2xl font-semibold text-[#000080]">
          Welcome, {user?.name}
        </h1>
        <p className="text-sm text-gray-600">
          Here’s your work summary for today
        </p>
      </div>

      {/* Today Status */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow border"
      >
        <h3 className="text-lg font-medium text-[#0047AB]">
          Today’s Status
        </h3>

        {!punchInTime && (
          <p className="mt-2 text-red-600 font-semibold">
            Not punched in yet
          </p>
        )}

        {punchInTime && !punchOutTime && (
          <p className="mt-2 text-green-600 font-semibold">
            Punched in at {new Date(punchInTime).toLocaleTimeString()}
          </p>
        )}

        {punchInTime && punchOutTime && (
          <p className="mt-2 text-[#0047AB] font-semibold">
            Punched out at {new Date(punchOutTime).toLocaleTimeString()}
          </p>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {["Punch In / Out", "Apply Leave", "Attendance History"].map(
          (item) => (
            <motion.div
              key={item}
              variants={card}
              whileHover={{ y: -5 }}
              className="bg-white p-4 rounded-lg shadow cursor-pointer"
            >
              <h4 className="font-medium text-[#000080]">
                {item}
              </h4>
            </motion.div>
          )
        )}
      </motion.div>

      {/* Leave Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">Total Leaves</p>
          <p className="text-2xl font-semibold text-[#0047AB]">
            {leaves.length}
          </p>
        </div>
      </motion.div>

      {/* Recent Leave Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h3 className="text-lg font-medium text-[#0047AB] mb-3">
          Recent Leave Activity
        </h3>

        <ul className="space-y-2 text-sm text-gray-600">
          {leaves.length ? (
            leaves.slice(0, 5).map((leave) => (
              <li key={leave._id}>
                ✔ {leave.status} leave ({leave.from} → {leave.to})
              </li>
            ))
          ) : (
            <li>No leave records found</li>
          )}
        </ul>
      </motion.div>
    </div>
  );
};

export default Home;
