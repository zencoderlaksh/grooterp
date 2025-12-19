import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async () => {
    const res = await axios.get("/api/admin/users");
    return res.data;
  }
);
export const fetchAllLeaves = createAsyncThunk(
  "admin/fetchAllLeaves",
  async () => {
    const res = await axios.get("/api/admin/leaves");
    return res.data;
  }
);

export const updateLeaveStatus = createAsyncThunk(
  "admin/updateLeaveStatus",
  async ({ id, status }) => {
    const res = await axios.patch(`/api/admin/leaves/${id}`, { status });
    return res.data;
  }
);
export const fetchAllAttendance = createAsyncThunk(
  "admin/fetchAllAttendance",
  async () => {
    const res = await axios.get("/api/admin/attendance");
    return res.data;
  }
)


const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
      leaves: [],
      attendance: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    }),
    builder.addCase(fetchAllLeaves.fulfilled, (state, action) => {
  state.leaves = action.payload;
})
    builder.addCase(updateLeaveStatus.fulfilled, (state, action) => {
  const index = state.leaves.findIndex(
    (l) => l._id === action.payload._id
  );
  if (index !== -1) {
    state.leaves[index] = action.payload;
  }
});
builder.addCase(fetchAllAttendance.fulfilled, (state, action) => {
  state.attendance = action.payload;
});

  },
});

export default adminSlice.reducer;
