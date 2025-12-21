const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

/* =======================
   EXISTING CONTROLLERS
======================= */
const {
  getAllUsers,
  getAllLeaves,
  updateLeaveStatus,
  getAllAttendance,
  exportAttendanceCSV,
  exportUserAttendanceCSV,
  getSalarySlip,
} = require("../controllers/adminController");

/* =======================
   NEW S-1 CONTROLLERS
======================= */
const {
  createCourse,
  getCourses,
} = require("../controllers/courseController");

const {
  createEnquiry,
  getEnquiries,
} = require("../controllers/enquiryController");

const {
  enrollStudent,
  getStudents,
} = require("../controllers/studentController");

const {
  createFeePlan,
} = require("../controllers/feeController");

/* =======================
   EXISTING ROUTES (UNCHANGED)
======================= */
router.get("/users", protect, isAdmin, getAllUsers);

router.get("/leaves", protect, isAdmin, getAllLeaves);
router.patch("/leaves/:id", protect, isAdmin, updateLeaveStatus);

router.get("/attendance", protect, isAdmin, getAllAttendance);
router.get("/salary/:userId", protect, isAdmin, getSalarySlip);

// CSV exports
router.get("/attendance/export", protect, isAdmin, exportAttendanceCSV);
router.get(
  "/attendance/export/:userId",
  protect,
  isAdmin,
  exportUserAttendanceCSV
);

/* =======================
   🔥 S-1 ACADEMY ROUTES
======================= */

// COURSES (Tech Stack)
router.post("/courses", protect, isAdmin, createCourse);
router.get("/courses", protect, isAdmin, getCourses);

// STUDENT ENQUIRIES
router.post("/enquiries", protect, isAdmin, createEnquiry);
router.get("/enquiries", protect, isAdmin, getEnquiries);

// STUDENTS (Enrollment)
router.post(
  "/students/enroll/:enquiryId",
  protect,
  isAdmin,
  enrollStudent
);
router.get("/students", protect, isAdmin, getStudents);

// FEES & EMI
router.post(
  "/fees/:studentId",
  protect,
  isAdmin,
  createFeePlan
);

module.exports = router;
