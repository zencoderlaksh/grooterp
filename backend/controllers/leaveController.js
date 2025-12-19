const Leave = require("../models/Leave");

// apply leave
exports.applyLeave = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fromDate, toDate, reason } = req.body;

    const leave = await Leave.create({
      userId,
      fromDate,
      toDate,
      reason,
    });

    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get my leaves
exports.getMyLeaves = async (req, res) => {
  try {
    const userId = req.user.id;
    const leaves = await Leave.find({ userId }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
