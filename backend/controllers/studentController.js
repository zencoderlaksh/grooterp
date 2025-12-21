import Student from "../models/Student.js";
import Enquiry from "../models/Enquiry.js";

export const enrollStudent = async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.enquiryId);
  if (!enquiry) return res.status(404).json({ msg: "Enquiry not found" });

  const student = await Student.create({
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    courseId: req.body.courseId,
    joiningDate: new Date()
  });

  enquiry.status = "enrolled";
  await enquiry.save();

  res.json(student);
};

export const getStudents = async (req, res) => {
  const students = await Student.find().populate("courseId");
  res.json(students);
};
