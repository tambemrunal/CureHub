import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { User, Calendar, Clock, FileText, Search, CheckCircle, Filter, Loader } from 'lucide-react';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique specializations
  const specializations = [...new Set(doctors.map(doctor => doctor.specialization))];

  // Filter doctors based on search and speciality
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeciality = selectedSpeciality ? doctor.specialization === selectedSpeciality : true;
    return matchesSearch && matchesSpeciality;
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('patientAuth');
        if (!token) {
          toast.error('Authentication required');
          setLoading(false);
          return;
        }

        const response = await axios.get('/api/patient/doctors', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
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
    if (selectedDoctor && selectedDate) {
      const doctor = doctors.find(d => d._id === selectedDoctor);
      if (doctor) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const availability = doctor.availability?.find(a => a.date === formattedDate);
        setAvailableSlots(availability ? availability.timeSlots : []);
      }
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDoctor, selectedDate, doctors]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot('');
  };

  const handleDoctorChange = (doctorId) => {
    setSelectedDoctor(doctorId);
    setSelectedSlot('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDoctor || !selectedSlot || !symptoms) {
      toast.error('Please fill all required fields');
      return;
    }

    setBookingInProgress(true);

    try {
      const token = localStorage.getItem('patientAuth');
      if (!token) {
        toast.error('Authentication required');
        setBookingInProgress(false);
        return;
      }

      const formattedDate = selectedDate.toISOString().split('T')[0];
      await axios.post('/api/patient/appointments', {
        doctorId: selectedDoctor,
        symptoms,
        date: formattedDate,
        time: selectedSlot
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      toast.success('Appointment booked successfully!');
      setSymptoms('');
      setSelectedSlot('');
      setBookingInProgress(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error booking appointment');
      setBookingInProgress(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin mb-4"></div>
          <p className="text-indigo-600 font-medium">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
        <Calendar className="mr-3 text-indigo-600" size={28} />
        Book Your Appointment
      </h2>
      
      <div className="mb-8">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-100">
          <div className="flex items-center mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-indigo-500" />
              </div>
              <input
                type="text"
                placeholder="Search doctors by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 p-3 bg-white border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 focus:outline-none transition-all"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="ml-3 flex items-center justify-center p-3 bg-white text-indigo-600 border-2 border-indigo-200 rounded-lg hover:bg-indigo-50 transition-all"
            >
              <Filter size={18} className="mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
          
          {showFilters && (
            <div className="mb-4 animate-fadeIn">
              <label className="block text-gray-700 font-medium mb-2">Filter by Specialization</label>
              <select
                value={selectedSpeciality}
                onChange={(e) => setSelectedSpeciality(e.target.value)}
                className="w-full p-3 bg-white border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 focus:outline-none transition-all"
              >
                <option value="">All Specializations</option>
                {specializations.map((spec, index) => (
                  <option key={index} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl border-2 border-indigo-100 p-4 transition-all hover:shadow-md">
              <label className="flex items-center text-gray-800 font-medium mb-3">
                <User size={20} className="mr-2 text-indigo-600" />
                <span>Select Doctor</span>
              </label>
              <div className="max-h-64 overflow-y-auto rounded-lg bg-gray-50 shadow-inner">
                {filteredDoctors.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 flex flex-col items-center">
                    <Search size={24} className="mb-2 text-gray-400" />
                    <p>No doctors found matching your criteria</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredDoctors.map(doctor => (
                      <div 
                        key={doctor._id} 
                        className={`p-4 cursor-pointer transition-all ${
                          selectedDoctor === doctor._id 
                            ? 'bg-indigo-100 border-l-4 border-indigo-600' 
                            : 'hover:bg-gray-100 border-l-4 border-transparent'
                        }`}
                        onClick={() => handleDoctorChange(doctor._id)}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center mr-3">
                            <User size={20} className="text-indigo-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{doctor.name}</div>
                            <div className="text-sm text-indigo-600 font-medium">{doctor.specialization}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl border-2 border-indigo-100 p-4 transition-all hover:shadow-md">
              <label className="flex items-center text-gray-800 font-medium mb-3">
                <Calendar size={20} className="mr-2 text-indigo-600" />
                <span>Select Date</span>
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
                className="w-full p-3 bg-gray-50 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 focus:outline-none shadow-inner"
                required
                dateFormat="MMMM d, yyyy"
                wrapperClassName="w-full"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl border-2 border-indigo-100 p-4 transition-all hover:shadow-md">
              <label className="flex items-center text-gray-800 font-medium mb-3">
                <Clock size={20} className="mr-2 text-indigo-600" />
                <span>Available Time Slots</span>
              </label>
              {!selectedDoctor ? (
                <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-lg">
                  Please select a doctor first
                </div>
              ) : availableSlots.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 border-2 rounded-lg transition-all ${
                        selectedSlot === slot 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md font-medium' 
                          : 'hover:bg-indigo-50 border-indigo-200 text-gray-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center border rounded-lg bg-red-50 text-red-600 flex flex-col items-center">
                  <Clock size={24} className="mb-2" />
                  <p>No available slots for selected date</p>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-xl border-2 border-indigo-100 p-4 transition-all hover:shadow-md">
              <label className="flex items-center text-gray-800 font-medium mb-3">
                <FileText size={20} className="mr-2 text-indigo-600" />
                <span>Symptoms / Reason for Visit</span>
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full p-4 bg-gray-50 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 focus:outline-none resize-none shadow-inner"
                rows="5"
                placeholder="Describe your symptoms or reason for consultation..."
                required
              />
            </div>
          </div>
        </div>
        
        <div className="pt-6 text-center md:text-right">
          <button
            type="submit"
            disabled={!selectedDoctor || !selectedSlot || !symptoms || bookingInProgress}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl transition-all hover:from-indigo-700 hover:to-blue-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none disabled:opacity-50 hover:shadow-lg text-lg font-medium"
          >
            {bookingInProgress ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin mr-3" size={22} />
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <CheckCircle size={22} className="mr-3" />
                Confirm Appointment
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;