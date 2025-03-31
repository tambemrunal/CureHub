// Backend/controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import nodemailer from "nodemailer";
import Appointment from "../models/Appointment.js";
import multer from "multer";

// Update doctor profile
export const updateDoctorProfile = async (req, res) => {
    try {
      const { name, mobile, age, gender, specialization, degree, experience, bio } = req.body;
      
      const doctor = await Doctor.findById(req.user._id);
  
      if (doctor) {
        doctor.name = name || doctor.name;
        doctor.mobile = mobile || doctor.mobile;
        doctor.age = age || doctor.age;
        doctor.gender = gender || doctor.gender;
        doctor.specialization = specialization || doctor.specialization;
        doctor.degree = degree || doctor.degree;
        doctor.experience = experience || doctor.experience;
        doctor.bio = bio || doctor.bio;
  
        if (req.file) {
          doctor.profileImg = req.file.path;
        }
  
        const updatedDoctor = await doctor.save();
  
        res.json({
          _id: updatedDoctor._id,
          name: updatedDoctor.name,
          email: updatedDoctor.email,
          mobile: updatedDoctor.mobile,
          age: updatedDoctor.age,
          gender: updatedDoctor.gender,
          specialization: updatedDoctor.specialization,
          degree: updatedDoctor.degree,
          experience: updatedDoctor.experience,
          bio: updatedDoctor.bio,
          profileImg: updatedDoctor.profileImg,
          role: updatedDoctor.role
        });
      } else {
        res.status(404);
        throw new Error('Doctor not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Add availability slots
  export const addAvailability = async (req, res) => {
    try {
      const { date, timeSlots } = req.body;
      
      const doctor = await Doctor.findById(req.user._id);
      
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      // Check if date already exists
      const existingDateIndex = doctor.availability.findIndex(a => a.date === date);
      
      if (existingDateIndex >= 0) {
        // Merge time slots if date exists
        const existingSlots = doctor.availability[existingDateIndex].timeSlots;
        const newSlots = [...new Set([...existingSlots, ...timeSlots])]; // Remove duplicates
        doctor.availability[existingDateIndex].timeSlots = newSlots;
      } else {
        // Add new date with time slots
        doctor.availability.push({ date, timeSlots });
      }
  
      await doctor.save();
      
      res.json(doctor.availability);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Get doctor availability
  export const getAvailability = async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.user._id).select('availability');
      res.json(doctor.availability);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Get patient appointments
//   export const getPatientAppointments = async (req, res) => {
//     try {
//       const patients = await Patient.find({
//         'medicalHistory.doctorId': req.user._id
//       }).select('name email medicalHistory');
  
//       // Filter and format appointments
//       const appointments = patients.flatMap(patient => 
//         patient.medicalHistory
//           .filter(appointment => appointment.doctorId.equals(req.user._id))
//           .map(appointment => ({
//             patientId: patient._id,
//             patientName: patient.name,
//             patientEmail: patient.email,
//             appointmentId: appointment._id,
//             symptoms: appointment.symptoms,
//             date: appointment.date,
//             time: appointment.time,
//             status: appointment.status
//           }))
//       );
  
//       res.json(appointments);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   };
  
  // Update appointment status
//   export const updateAppointmentStatus = async (req, res) => {
//     try {
//       const { patientId, appointmentId, status } = req.body;
      
//       const patient = await Patient.findById(patientId);
      
//       if (!patient) {
//         return res.status(404).json({ message: 'Patient not found' });
//       }
  
//       const appointment = patient.medicalHistory.id(appointmentId);
      
//       if (!appointment) {
//         return res.status(404).json({ message: 'Appointment not found' });
//       }
  
//       appointment.status = status;
//       await patient.save();
  
//       res.json({ message: 'Appointment status updated successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   };

export const getPatientAppointments = async (req, res) => {
    try {
      const doctorId = req.user._id; // Assuming the doctor is logged in
  
      // Fetch appointments related to the logged-in doctor
      const appointments = await Appointment.find({ doctorId })
        .populate("patientId", "name email") // Populate patient details
        .select("_id patientId date time symptoms status");
  
      if (!appointments.length) {
        return res.status(404).json({ message: "No appointments found for this doctor" });
      }
  
      // Format response
      const formattedAppointments = appointments.map((appointment) => ({
        appointmentId: appointment._id,
        patientId: appointment.patientId._id,
        patientName: appointment.patientId.name,
        patientEmail: appointment.patientId.email,
        symptoms: appointment.symptoms,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
      }));
  
      res.json(formattedAppointments);
    } catch (error) {
      console.error(error);
      
      res.status(500).json({ message: "Server Error" });
    }
  };
export const updateAppointmentStatus = async (req, res) => {
    try {
      const { appointmentId, status } = req.body;
      const doctorId = req.user._id; // Assuming the doctor is logged in
  
      // Validate status
      if (!["Accepted", "Rejected", "Pending"].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
  
      // Find the appointment
      const appointment = await Appointment.findById(appointmentId);
      
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      // Verify the appointment belongs to this doctor
      if (appointment.doctorId.toString() !== doctorId.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this appointment' });
      }
  
      // Update the status
      appointment.status = status;
      await appointment.save();
  
      // If accepted, add patient to doctor's patients list if not already there
      if (status === "Accepted") {
        await Doctor.findByIdAndUpdate(doctorId, {
          $addToSet: { patients: appointment.patientId }
        });
      }
  
      // Also update in patient's medicalHistory for backward compatibility
      await Patient.updateOne(
        { 
          _id: appointment.patientId,
          "medicalHistory._id": appointmentId // This assumes you're still storing appointments in both places
        },
        {
          $set: { "medicalHistory.$.status": status }
        }
      );
  
      res.json({ 
        message: 'Appointment status updated successfully',
        updatedAppointment: {
          _id: appointment._id,
          patientId: appointment.patientId,
          doctorId: appointment.doctorId,
          status: appointment.status,
          date: appointment.date,
          time: appointment.time,
          symptoms: appointment.symptoms
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };