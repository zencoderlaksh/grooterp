import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "../../api/axios";

const SalarySlip = () => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const slipRef = useRef(null);

  const [data, setData] = useState(null);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  useEffect(() => {
    axios
      .get(`/api/admin/salary/${userId}?from=${from}&to=${to}`)
      .then((res) => setData(res.data));
  }, [userId, from, to]);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div
        ref={slipRef}
        className="max-w-2xl mx-auto bg-white p-6 border"
      >
        <h2 className="text-xl font-bold text-center mb-4">
          GrootERP – Salary Slip
        </h2>

        <p><strong>Employee:</strong> {data.employee.name}</p>
        <p><strong>Email:</strong> {data.employee.email}</p>
        <p><strong>Period:</strong> {from} → {to}</p>

        <hr className="my-4" />

        <p><strong>Total Hours:</strong> {data.totalHours}</p>
        <p><strong>Hourly Rate:</strong> ₹{data.hourlyRate}</p>
        <p className="text-lg font-semibold">
          Net Salary: ₹{data.salary}
        </p>

        <p className="text-sm mt-6 text-gray-500">
          This is a system-generated salary slip.
        </p>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => window.print()}
          className="bg-[#0047AB] text-white px-4 py-2 rounded"
        >
          Print / Save PDF
        </button>
      </div>
    </div>
  );
};

export default SalarySlip;
