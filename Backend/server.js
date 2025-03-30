import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoute.js"; // Import your admin routes here
import doctorRoutes from "./routes/doctorRoute.js"; // Import your doctor routes here
import patientRoutes from "./routes/patientRoutes.js"; // Import your patient routes here
// import patientRoutes from "./routes/patientRoute.js"; // Import your patient routes here

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); // Assuming you have an adminRoutes file
app.use("/api/doctor", doctorRoutes); // Assuming you have a doctorRoutes file
app.use('/api/patient', patientRoutes);
// app.use("/api/patient", patientRoutes); // Assuming you have a patientRoutes file


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
