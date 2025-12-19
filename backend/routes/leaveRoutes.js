const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  applyLeave,
  getMyLeaves,
} = require("../controllers/leaveController");

router.post("/apply", protect, applyLeave);
router.get("/my", protect, getMyLeaves);

module.exports = router;
