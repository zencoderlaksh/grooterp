import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/ui/Loader";


/* ZOD SCHEMA */
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  const result = loginSchema.safeParse(form);

  if (!result.success) {
    toast.error(result.error.issues[0].message);
    return;
  }

  setLoading(true);
  const res = await dispatch(loginUser(form));
  setLoading(false);

  if (res.meta.requestStatus === "fulfilled") {
    toast.success("Login successful");
    navigate("/");
  } else {
    toast.error("Invalid credentials");
  }
};



  return (
  <>
    <Toaster position="top-right" />

    {loading && (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <Loader size={60} />
      </div>
    )}

    <div className="min-h-screen flex">
      {/* LEFT */}
      <div className="w-1/2 bg-[#000080] flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">
          Groot<span className="text-[#82C8E5]">Academy</span>
        </h1>
      </div>

      {/* RIGHT */}
      <div className="w-1/2 flex items-center justify-center bg-[#6D8196]/10">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-center text-[#000080] mb-6">
            Login
          </h2>

          <input
            className="w-full border p-2 mb-4 rounded focus:border-[#0047AB] focus:outline-none"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="w-full border p-2 mb-4 rounded focus:border-[#0047AB] focus:outline-none"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#0047AB] hover:bg-[#000080] text-white py-2 rounded disabled:opacity-60"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            New user?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#0047AB] cursor-pointer font-medium hover:underline"
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  </>
);

};

export default Login;
