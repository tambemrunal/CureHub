// frontend/src/components/patient/AppointmentsHistory.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppointmentsHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/api/patient/appointments",
            {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("patientAuth")}`,
                },
            }
        );
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <div>Loading appointments...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Appointment History</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="border p-4 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">
                    Dr. {appointment.doctorId.name}
                  </h3>
                  <p className="text-gray-600">
                    {appointment.doctorId.specialization}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Date:</span>{" "}
                    {appointment.date}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{" "}
                    {appointment.time}
                  </p>
                  <p>
                    <span className="font-medium">Symptoms:</span>{" "}
                    {appointment.symptoms}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded ${
                    appointment.status === "Accepted"
                      ? "bg-green-100 text-green-800"
                      : appointment.status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsHistory;
