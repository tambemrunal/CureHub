// frontend/src/components/patient/BookAppointment.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/api/patient/doctors',
            {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('patientAuth')}`,
                },
            }
        );
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching doctors');
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      const doctor = doctors.find(d => d._id === selectedDoctor);
      if (doctor) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const availability = doctor.availability.find(a => a.date === formattedDate);
        setAvailableSlots(availability ? availability.timeSlots : []);
      }
    }
  }, [selectedDoctor, selectedDate, doctors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDoctor || !selectedSlot || !symptoms) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      await axios.post('/api/patient/appointments', {
        doctorId: selectedDoctor,
        symptoms,
        date: formattedDate,
        time: selectedSlot
      },
      {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('patientAuth')}`,
        }, } );
      
      toast.success('Appointment booked successfully!');
      setSymptoms('');
      setSelectedSlot('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error booking appointment');
    }
  };

  if (loading) return <div>Loading doctors...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Doctor</label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map(doctor => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name} ({doctor.specialization})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {selectedDoctor && availableSlots.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Available Time Slots</label>
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2 border rounded ${selectedSlot === slot ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedDoctor && availableSlots.length === 0 && (
          <div className="mb-4 text-red-500">
            No available slots for selected date
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Symptoms</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!selectedDoctor || !selectedSlot || !symptoms}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;