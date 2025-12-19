import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = () => {
    dispatch(loginUser(form)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    });
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 shadow rounded">
      <h2 className="text-xl mb-4 text-center">Login</h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-3"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
