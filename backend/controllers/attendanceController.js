const Attendance = require("../models/Attendance");

// Punch In
exports.punchIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    const existing = await Attendance.findOne({ userId, date: today });
    if (existing) {
      return res.status(400).json({ message: "Already punched in today" });
    }

    const attendance = await Attendance.create({
      userId,
      date: today,
      punchIn: new Date(),
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Punch Out
exports.punchOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({ userId, date: today });

    if (!attendance || !attendance.punchIn) {
      return res.status(400).json({ message: "Punch in first" });
    }

    attendance.punchOut = new Date();

    const diff =
      (attendance.punchOut - attendance.punchIn) / (1000 * 60 * 60);
    attendance.workingHours = diff.toFixed(2);

    await attendance.save();

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Today attendence
exports.getTodayAttendance = async (req, res) => {
  const userId = req.user.id;
  const today = new Date().toISOString().split("T")[0];

  const attendance = await Attendance.findOne({ userId, date: today });
  res.json(attendance);
};

// Attendance history (logged-in user)
exports.getAttendanceHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await Attendance.find({ userId })
      .sort({ date: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

