// frontend/src/pages/DoctorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import EditProfile from '../components/doctor/EditProfile';
import Availability from '../components/doctor/Availability';
import Appointments from '../components/doctor/Appointments';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(response.data);
      } catch (error) {
        toast.error('Error fetching profile');
        navigate('/login');
      }
    };

    fetchDoctorProfile();
  }, [navigate]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      
      <div className="flex mb-6 border-b">
        <button
          className={`py-2 px-4 ${activeTab === 'profile' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'availability' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('availability')}
        >
          Availability
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'appointments' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
      </div>

      {activeTab === 'profile' && <EditProfile doctor={doctor} setDoctor={setDoctor} />}
      {activeTab === 'availability' && <Availability doctorId={doctor._id} />}
      {activeTab === 'appointments' && <Appointments doctorId={doctor._id} />}
    </div>
  );
};

export default DoctorDashboard;