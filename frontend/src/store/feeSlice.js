import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const createFeePlan = createAsyncThunk(
  "fees/create",
  async ({ studentId, payload }) =>
    (await api.post(`/admin/fees/${studentId}`, payload)).data
);

const feeSlice = createSlice({
  name: "fees",
  initialState: [],
  extraReducers: () => {}
});

export default feeSlice.reducer;
