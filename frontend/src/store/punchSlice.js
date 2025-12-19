import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const punchIn = createAsyncThunk(
  "punch/punchIn",
  async () => {
    const res = await axios.post("/api/attendance/punch-in");
    return res.data;
  }
);

export const punchOut = createAsyncThunk(
  "punch/punchOut",
  async () => {
    const res = await axios.post("/api/attendance/punch-out");
    return res.data;
  }
);

export const fetchTodayPunch = createAsyncThunk(
  "punch/fetchToday",
  async () => {
    const res = await axios.get("/api/attendance/today");
    return res.data;
  }
);
export const fetchAttendanceHistory = createAsyncThunk(
  "punch/fetchHistory",
  async () => {
    const res = await axios.get("/api/attendance/history");
    return res.data;
  }
);



const punchSlice = createSlice({
  name: "punch",
  initialState: {
    punchInTime: null,
    punchOutTime: null,
      history: [],
  },
   reducers: {
    resetPunch: (state) => {
      state.punchInTime = null;
      state.punchOutTime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(punchIn.fulfilled, (state, action) => {
        state.punchInTime = action.payload.punchIn;
        state.punchOutTime = null;
      })
      .addCase(punchOut.fulfilled, (state, action) => {
        state.punchOutTime = action.payload.punchOut;
      })
      .addCase(fetchTodayPunch.fulfilled, (state, action) => {
  if (action.payload) {
    state.punchInTime = action.payload.punchIn;
    state.punchOutTime = action.payload.punchOut;
  }
})
.addCase(fetchAttendanceHistory.fulfilled, (state, action) => {
  state.history = action.payload;
});

      
  },
});

export const { resetPunch } = punchSlice.actions;
export default punchSlice.reducer;
