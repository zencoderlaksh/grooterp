import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchEnquiries = createAsyncThunk(
  "enquiries/fetch",
  async () => (await api.get("/admin/enquiries")).data
);

export const createEnquiry = createAsyncThunk(
  "enquiries/create",
  async (data) => (await api.post("/admin/enquiries", data)).data
);

const enquirySlice = createSlice({
  name: "enquiries",
  initialState: [],
  extraReducers: (b) => {
    b.addCase(fetchEnquiries.fulfilled, (_, a) => a.payload);
    b.addCase(createEnquiry.fulfilled, (s, a) => {
      s.unshift(a.payload);
    });
  }
});

export default enquirySlice.reducer;
