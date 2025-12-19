const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const { getAllUsers,getAllLeaves,
  updateLeaveStatus,getAllAttendance,exportAttendanceCSV } = require("../controllers/adminController");

router.get("/users", protect, isAdmin, getAllUsers);
router.get("/leaves", protect, isAdmin, getAllLeaves);
router.patch("/leaves/:id", protect, isAdmin, updateLeaveStatus);
router.get("/attendance", protect, isAdmin, getAllAttendance);
router.get("/attendance/export", protect, isAdmin, exportAttendanceCSV);

module.exports = router;
