import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import loginRoutes from "./routes/loginRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import testRoutes from "./routes/testRoutes.js";
// import employeeRoutes from "./routes/employeeRoutes.js"


dotenv.config();
const app = express();
const PORT = 5001;



connectDB();
app.use(express.json());

// app.use("/api/testRoutes", testRoutes);
app.use("/api/login", loginRoutes);
// app.use("/api/adminPortal", adminRoutes);
// app.use("/api/employee", employeeRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
