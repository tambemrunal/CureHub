// frontend/src/components/doctor/Appointments.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointments = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    const fetchAppointments = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("/api/doctor/appointments", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAppointments(response.data);
          setLoading(false);
        } catch (error) {
          toast.error("Error fetching appointments");
          setLoading(false);
        }
      };

    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (appointmentId, patientId, status) => {
    try {
      await axios.put('/api/doctor/appointments', {
        appointmentId,
        patientId,
        status
      },
      { 
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}` },  
        });
      
      // Update local state
      setAppointments(prev => prev.map(app => 
        app.appointmentId === appointmentId ? { ...app, status } : app
      ));
      
      toast.success(`Appointment ${status.toLowerCase()}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating appointment');
    }
  };

  if (loading) return <div>Loading appointments...</div>;

  const filteredAppointments = appointments.filter(app => 
    activeTab === 'pending' ? app.status === 'Pending' : 
    activeTab === 'accepted' ? app.status === 'Accepted' :
    activeTab === 'rejected' ? app.status === 'Rejected' : true
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Patient Appointments</h2>
      
      <div className="flex mb-6 border-b">
        <button
          className={`py-2 px-4 ${activeTab === 'pending' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'accepted' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('accepted')}
        >
          Accepted
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'rejected' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected
        </button>
      </div>

      {filteredAppointments.length === 0 ? (
        <p>No {activeTab} appointments found.</p>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.appointmentId} className="border p-4 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{appointment.patientName}</h3>
                  <p className="text-gray-600">{appointment.patientEmail}</p>
                  <p className="mt-2">
                    <span className="font-medium">Date:</span> {appointment.date}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span> {appointment.time}
                  </p>
                  <p>
                    <span className="font-medium">Symptoms:</span> {appointment.symptoms}
                  </p>
                </div>
                {appointment.status === 'Pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate(
                        appointment.appointmentId,
                        appointment.patientId,
                        'Accepted'
                      )}
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(
                        appointment.appointmentId,
                        appointment.patientId,
                        'Rejected'
                      )}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {appointment.status !== 'Pending' && (
                  <span className={`px-3 py-1 rounded ${
                    appointment.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {appointment.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;