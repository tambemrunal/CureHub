import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import AddPrescriptionForm from "./AddPrescriptionForm";

const DoctorPrescriptionDashboard = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/doctor/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Filter only accepted
      const accepted = data.filter((appt) => appt.status === "Accepted");
      setAppointments(accepted);
      console.log(accepted);
    } catch (err) {
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleGivePrescription = (patient) => {
    setSelectedPatient(patient);
  };

  const handleSuccess = () => {
    // after saving prescription, close form and refresh
    setSelectedPatient(null);
    fetchAppointments();
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Accepted Appointments
      </Typography>
      <Grid container spacing={2}>
        {appointments.map((patient) => (
          <Grid item xs={12} sm={6} md={4} key={patient.appointmentId}>
            <Card sx={{ minHeight: 200, position: "relative" }}>
              <CardContent>
                <Typography variant="h6">{patient.patientName}</Typography>
                <Typography variant="body2">
                  Email: {patient.patientEmail}
                </Typography>
                <Typography variant="body2">Date: {patient.date}</Typography>
                <Typography variant="body2">Time: {patient.time}</Typography>
                <Typography variant="body2">
                  Symptoms: {patient.symptoms}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => handleGivePrescription(patient)}
                >
                  Give Prescription
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedPatient && (
        <Box sx={{ mt: 4 }}>
          <AddPrescriptionForm
            patient={selectedPatient}
            onSuccess={handleSuccess}
          />
        </Box>
      )}
    </Box>
  );
};

export default DoctorPrescriptionDashboard;
