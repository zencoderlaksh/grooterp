const express = require("express");
const cors = require("cors");
require("dotenv").config();



const connectDB = require("./config/db");

const app = express();

// connect database
connectDB();

// middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
// test route
app.get("/", (req, res) => {
  res.send("Groot ERP Backend Running");
});


app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
