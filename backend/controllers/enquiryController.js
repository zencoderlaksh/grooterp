import Enquiry from "../models/Enquiry.js";

export const createEnquiry = async (req, res) => {
  const enquiry = await Enquiry.create(req.body);
  res.json(enquiry);
};

export const getEnquiries = async (req, res) => {
  const enquiries = await Enquiry.find().populate("interestedCourses");
  res.json(enquiries);
};
