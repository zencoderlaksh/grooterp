import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchStudents = createAsyncThunk(
  "students/fetch",
  async () => (await api.get("/admin/students")).data
);

export const enrollStudent = createAsyncThunk(
  "students/enroll",
  async ({ enquiryId, courseId }) =>
    (await api.post(`/admin/students/enroll/${enquiryId}`, { courseId })).data
);

const studentSlice = createSlice({
  name: "students",
  initialState: [],
  extraReducers: (b) => {
    b.addCase(fetchStudents.fulfilled, (_, a) => a.payload);
    b.addCase(enrollStudent.fulfilled, (s, a) => {
      s.push(a.payload);
    });
  }
});

export default studentSlice.reducer;
