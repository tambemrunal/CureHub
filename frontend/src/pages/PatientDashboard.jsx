// frontend/src/pages/PatientDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookAppointment from '../components/patient/BookAppointment';
import AppointmentsHistory from '../components/patient/AppointmentsHistory';
import EditProfile from '../components/patient/EditProfile';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('book');
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>
      
      <div className="flex mb-6 border-b">
        <button
          className={`py-2 px-4 ${activeTab === 'book' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('book')}
        >
          Book Appointment
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'history' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Appointment History
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'profile' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Edit Profile
        </button>
      </div>

      {activeTab === 'book' && <BookAppointment />}
      {activeTab === 'history' && <AppointmentsHistory />}
      {activeTab === 'profile' && <EditProfile />}
    </div>
  );
};

export default PatientDashboard;