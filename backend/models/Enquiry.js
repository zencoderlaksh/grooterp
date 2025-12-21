import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    interestedCourses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
    ],
    status: {
      type: String,
      enum: ["new", "contacted", "enrolled", "dropped"],
      default: "new"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
