import { configureStore } from "@reduxjs/toolkit";
import punchReducer from "./punchSlice";
import leaveReducer from "./leaveSlice";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import courseReducer from "./courseSlice";
import enquiryReducer from "./enquirySlice";
import studentReducer from "./studentSlice";
import feeReducer from "./feeSlice";

const store = configureStore({
  reducer: {
    punch: punchReducer,
    leave: leaveReducer,
    auth: authReducer,
    admin: adminReducer,
    courses: courseReducer,
    enquiries: enquiryReducer,
    students: studentReducer,
    fees: feeReducer,
  },
});

export default store;
