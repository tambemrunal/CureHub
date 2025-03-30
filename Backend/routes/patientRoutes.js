// Backend/routes/patientRoutes.js
import express from "express";
import { 
  getDoctorsWithAvailability,
  bookAppointment,
  getPatientAppointments,
  updatePatientProfile
} from "../controllers/patientController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/doctors', protect, getDoctorsWithAvailability);
router.post('/appointments', protect, bookAppointment);
router.get('/appointments', protect, getPatientAppointments);
router.put('/profile', protect, updatePatientProfile);

export default router;