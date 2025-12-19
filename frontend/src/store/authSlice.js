import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginApi, signup as signupApi } from "../api/axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data) => {
    const res = await loginApi(data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data.user;
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data) => {
    await signupApi(data);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
