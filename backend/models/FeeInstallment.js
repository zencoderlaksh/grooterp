import mongoose from "mongoose";

const installmentSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    dueDate: Date,
    amount: Number,
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("FeeInstallment", installmentSchema);
