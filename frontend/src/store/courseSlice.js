import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchCourses = createAsyncThunk(
  "courses/fetch",
  async () => (await api.get("/admin/courses")).data
);

export const createCourse = createAsyncThunk(
  "courses/create",
  async (data) => (await api.post("/admin/courses", data)).data
);

const courseSlice = createSlice({
  name: "courses",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (_, action) => action.payload);
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  }
});

export default courseSlice.reducer;
