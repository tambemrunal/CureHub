// Backend/routes/authRoutes.js
// Add these new routes to your existing authRoutes
// Backend/routes/authRoutes.js
import express from "express";

import { 
  updateDoctorProfile, 
  addAvailability, 
  getAvailability, 
  getPatientAppointments, 
  updateAppointmentStatus 
} from "../controllers/doctorController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
// Doctor specific routes
router.put('/profile', protect, updateDoctorProfile);
router.post('/availability', protect, addAvailability);
router.get('/availability', protect, getAvailability);
router.get('/appointments', protect, getPatientAppointments);
router.put('/appointments', protect, updateAppointmentStatus);

export default router;