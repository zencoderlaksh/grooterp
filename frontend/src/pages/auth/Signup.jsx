import { useDispatch } from "react-redux";
import { signupUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/* Zod schema */
const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
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
  defaultValues: {
    role: "user",
  },
});
const onSubmit = (data) => {
  dispatch(signupUser(data)).then(() => {
    navigate("/login");
  });
};



  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 shadow rounded">
      <h2 className="text-xl mb-4 text-center">Signup</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
  <label className="block text-sm font-medium text-gray-600 mb-1">
    Role
  </label>

  <select
    {...register("role")}
    className="w-full border p-2 rounded"
  >
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>

  {errors.role && (
    <p className="text-red-500 text-sm">{errors.role.message}</p>
  )}
</div>


        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
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
          className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-60"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
