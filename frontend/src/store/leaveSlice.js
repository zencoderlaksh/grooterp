import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const applyLeave = createAsyncThunk(
  "leave/apply",
  async (payload) => {
    const res = await axios.post("/api/leave/apply", payload);
    return res.data;
  }
);

export const fetchMyLeaves = createAsyncThunk(
  "leave/fetchMy",
  async (userId) => {
    const res = await axios.get(`/api/leave/my?userId=${userId}`);
    return res.data;
  }
);

const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyLeaves.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(applyLeave.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      });
  },
});

export default leaveSlice.reducer;
