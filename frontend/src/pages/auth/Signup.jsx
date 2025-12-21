import { useDispatch } from "react-redux";
import { signupUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/ui/Loader";


/* Zod schema */
const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  role: z.enum(["user", "admin"]),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: "user" },
  });

  const onSubmit = async (data) => {
    const res = await dispatch(signupUser(data));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Signup successful");
      navigate("/login");
    } else {
      toast.error("Signup failed");
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      {isSubmitting && (
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
              Signup
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register("name")}
                  placeholder="Name"
                  className="w-full border p-2 rounded focus:border-[#0047AB] focus:outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("email")}
                  placeholder="Email"
                  className="w-full border p-2 rounded focus:border-[#0047AB] focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register("role")}
                  className="w-full border p-2 rounded focus:border-[#0047AB] focus:outline-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="w-full border p-2 rounded focus:border-[#0047AB] focus:outline-none"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0047AB] hover:bg-[#000080] text-white py-2 rounded transition disabled:opacity-60"
              >
                Signup
              </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
              Already signed up?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#0047AB] cursor-pointer font-medium hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
