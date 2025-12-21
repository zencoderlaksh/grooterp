const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  punchIn,
  punchOut,
  getTodayAttendance,
  getAttendanceHistory,
} = require("../controllers/attendanceController");

// User attendance only
router.post("/punch-in", protect, punchIn);
router.post("/punch-out", protect, punchOut);
router.get("/today", protect, getTodayAttendance);
router.get("/history", protect, getAttendanceHistory);

module.exports = router;
