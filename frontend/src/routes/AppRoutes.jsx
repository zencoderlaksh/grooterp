import { Routes, Route } from "react-router-dom";

// pages (we will create these next)
import Home from "../pages/home/Home";
import Leave from "../pages/leave/Leave";
import Punch from "../pages/punch/Punch";
import Layout from "../layout/Layout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ProtectedRoute from "./ProtectedRoute";
import AttendanceHistory from "../pages/attendance/AttendanceHistory";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminRoute from "./AdminRoute";
import Users from "../pages/admin/Users";
import AdminLeaves from "../pages/admin/Leaves";
import AdminAttendance from "../pages/admin/Attendance";
import AdminCharts from "../pages/admin/AdminCharts";
import { ThemeProviderCustom } from "../components/ThemeContext";
import SalarySlip from "../pages/admin/SalarySlip";

const AppRoutes = () => {
  return (
    <ThemeProviderCustom>
    <Routes>
      <Route element={<Layout />}>
       <Route
  path="/"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>

<Route
  path="/punch"
  element={
    <ProtectedRoute>
      <Punch />
    </ProtectedRoute>
  }
/>

<Route
  path="/leave"
  element={
    <ProtectedRoute>
      <Leave />
    </ProtectedRoute>
  }
/>
<Route
  path="/attendance-history"
  element={
    <ProtectedRoute>
      <AttendanceHistory />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <Users />
    </AdminRoute>
  }
/>
<Route
  path="/admin/leaves"
  element={
    <AdminRoute>
      <AdminLeaves />
    </AdminRoute>
  }
/>
<Route
  path="/admin/attendance"
  element={
    <AdminRoute>
      <AdminAttendance />
    </AdminRoute>
  }
/>
<Route
  path="/admin/charts"
  element={
    <AdminRoute>
      <AdminCharts />
    </AdminRoute>
  }
/>
<Route
  path="/admin/salary/:userId"
  element={
    <AdminRoute>
      <SalarySlip />
    </AdminRoute>
  }
/>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </ThemeProviderCustom>
  );
};

export default AppRoutes;
