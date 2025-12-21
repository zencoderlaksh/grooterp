import mongoose from "mongoose";

const feePlanSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    totalAmount: Number,
    paymentType: {
      type: String,
      enum: ["FULL", "HALF", "EMI"]
    },
    emiCount: Number,
    startDate: Date
  },
  { timestamps: true }
);

export default mongoose.model("FeePlan", feePlanSchema);
