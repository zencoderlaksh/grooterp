const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    punchIn: {
      type: Date,
    },
    punchOut: {
      type: Date,
    },
    workingHours: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
