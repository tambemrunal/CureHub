import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import axios from "axios";

const AddPrescriptionForm = ({ patient, onSuccess }) => {
  const [prescription, setPrescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/doctor/patients/${patient.patientId}/records/${patient.appointmentId}/prescription`,

        { prescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSuccess();
    } catch (err) {
      setError("Failed to add prescription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Prescription for {patient.patientName}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Appointment Date: {patient.date}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Symptoms: {patient.symptoms}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Prescription"
              multiline
              rows={8}
              fullWidth
              variant="outlined"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
              size="large"
            >
              {loading ? "Saving..." : "Save Prescription"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AddPrescriptionForm;
