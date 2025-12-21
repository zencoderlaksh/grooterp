import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },
    joiningDate: Date,
    status: {
      type: String,
      enum: ["active", "completed", "dropped"],
      default: "active"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
