const User = require("../models/User");
const Attendance = require("../models/Attendance");

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Leave = require("../models/Leave");

// Get all leave requests
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve / Reject leave
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body; // approved | rejected

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Get All Attendance
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate("userId", "name email")
      .populate("userId", "name email")
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Exporting all the attendence
exports.exportAttendanceCSV = async (req, res) => {
  const records = await Attendance.find()
    .populate("userId", "name email");

  let csv = "Name,Email,Date,Punch In,Punch Out,Hours\n";

  records.forEach((r) => {
    csv += `${r.userId?.name},${r.userId?.email},${r.date},${r.punchIn || ""},${r.punchOut || ""},${r.workingHours || ""}\n`;
  });

  res.header("Content-Type", "text/csv");
  res.attachment("attendance.csv");
  res.send(csv);
};

exports.exportUserAttendanceCSV = async (req, res) => {
  try {
    const { userId } = req.params;

    const records = await Attendance.find({ userId })
      .populate("userId", "name email")
      .sort({ date: 1 });

    if (!records.length) {
      return res.status(404).send("No attendance found");
    }

    let csv = "Name,Email,Date,Punch In,Punch Out,Hours\n";

    records.forEach((r) => {
      csv += `${r.userId.name},${r.userId.email},${r.date},${
        r.punchIn ? new Date(r.punchIn).toLocaleTimeString() : ""
      },${r.punchOut ? new Date(r.punchOut).toLocaleTimeString() : ""},${
        r.workingHours || 0
      }\n`;
    });

    res.header("Content-Type", "text/csv");
    res.attachment(`${records[0].userId.name}-attendance.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//For Calculating Salary
exports.getSalarySlip = async (req, res) => {
  try {
    const { userId } = req.params;
    const { from, to } = req.query;

    const records = await Attendance.find({
      userId,
      date: { $gte: from, $lte: to },
    }).populate("userId", "name email");

    if (!records.length) {
      return res.status(404).json({ message: "No attendance data" });
    }

    const totalHours = records.reduce(
      (sum, r) => sum + (r.workingHours || 0),
      0
    );

    const hourlyRate = 200;
    const salary = totalHours * hourlyRate;

    res.json({
      employee: records[0].userId,
      period: { from, to },
      totalHours,
      hourlyRate,
      salary,
      generatedOn: new Date(),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




