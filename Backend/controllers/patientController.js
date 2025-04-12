// Backend/controllers/patientController.js
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";

// Get all doctors with availability
export const getDoctorsWithAvailability = async (req, res) => {
  try {
    const doctors = await Doctor.find({})
      .select('-password')
      .populate('availability');
    
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Book appointment
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, symptoms, date, time } = req.body;
    const patientId = req.user._id;

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if time slot is available
    const isAvailable = doctor.availability.some(avail => 
      avail.date === date && avail.timeSlots.includes(time)
    );

    if (!isAvailable) {
      return res.status(400).json({ message: 'Selected time slot is not available' });
    }

    // Create appointment
    const appointment = new Appointment({
      patientId,
      doctorId,
      symptoms,
      date,
      time,
      status: 'Pending'
    });

    await appointment.save();

    // Add to patient's medical history
    await Patient.findByIdAndUpdate(patientId, {
      $push: {
        medicalHistory: {
          doctorId,
          symptoms,
          date,
          time,
          status: 'Pending'
        }
      }
    });

    // Add patient to doctor's patients list if not already there
    await Doctor.findByIdAndUpdate(doctorId, {
      $addToSet: { patients: patientId }
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get patient appointments
export const getPatientAppointments = async (req, res) => {
  try {
    const patientId = req.user._id;
    
    const appointments = await Appointment.find({ patientId })
      .populate('doctorId', 'name specialization degree')
      .sort({ createdAt: -1 });
    
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update patient profile
export const updatePatientProfile = async (req, res) => {
  try {
    const { name, mobile, age, gender, address, bloodGroup, emergencyContact } = req.body;
    const patientId = req.user._id;

    const patient = await Patient.findById(patientId);

    if (patient) {
      patient.name = name || patient.name;
      patient.mobile = mobile || patient.mobile;
      patient.age = age || patient.age;
      patient.gender = gender || patient.gender;
      patient.address = address || patient.address;
      patient.bloodGroup = bloodGroup || patient.bloodGroup;
      patient.emergencyContact = emergencyContact || patient.emergencyContact;

      if (req.file) {
        patient.profileImg = req.file.path;
      }

      const updatedPatient = await patient.save();

      res.json({
        _id: updatedPatient._id,
        name: updatedPatient.name,
        email: updatedPatient.email,
        mobile: updatedPatient.mobile,
        age: updatedPatient.age,
        gender: updatedPatient.gender,
        address: updatedPatient.address,
        bloodGroup: updatedPatient.bloodGroup,
        emergencyContact: updatedPatient.emergencyContact,
        profileImg: updatedPatient.profileImg,
        role: updatedPatient.role,
      });
    } else {
      res.status(404);
      throw new Error("Patient not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
