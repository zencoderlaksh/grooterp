import { configureStore } from "@reduxjs/toolkit";
import punchReducer from "./punchSlice";
import leaveReducer from "./leaveSlice";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";

const store = configureStore({
  reducer: {
    punch: punchReducer,
    leave: leaveReducer,
    auth: authReducer,
    admin: adminReducer,
  },
});

export default store;
