import FeePlan from "../models/FeePlan.js";
import FeeInstallment from "../models/FeeInstallment.js";

export const createFeePlan = async (req, res) => {
  const { totalAmount, paymentType, emiCount } = req.body;
  const { studentId } = req.params;

  const plan = await FeePlan.create({
    studentId,
    totalAmount,
    paymentType,
    emiCount,
    startDate: new Date()
  });

  let installments = [];
  const count = paymentType === "FULL" ? 1 : paymentType === "HALF" ? 2 : emiCount;
  const amount = totalAmount / count;

  for (let i = 0; i < count; i++) {
    installments.push({
      studentId,
      amount,
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + i))
    });
  }

  await FeeInstallment.insertMany(installments);
  res.json({ plan, installments });
};
