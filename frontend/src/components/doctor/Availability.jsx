// frontend/src/components/doctor/Availability.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Availability = ({ doctorId }) => {
  const [availability, setAvailability] = useState([]);
  const [newDate, setNewDate] = useState(new Date());
  const [newTimeSlot, setNewTimeSlot] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("/api/doctor/availability", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAvailability(response.data);
          setLoading(false);
        } catch (error) {
          toast.error("Error fetching availability");
          setLoading(false);
        }
      };

    fetchAvailability();
  }, []);

  const handleAddTimeSlot = async () => {
    if (!newTimeSlot) {
      toast.error("Please enter a time slot");
      return;
    }
    const formattedDate = newDate.toISOString().split("T")[0];
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/doctor/availability",
        { date: formattedDate, timeSlots: [newTimeSlot] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAvailability();
      setNewTimeSlot("");
      toast.success("Time slot added successfully!");
    } catch (error) {
      toast.error("Error adding time slot");
    }
  };

  if (loading) return <div>Loading availability...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Manage Availability</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Add New Time Slot</h3>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Date</label>
            <DatePicker
              selected={newDate}
              onChange={(date) => setNewDate(date)}
              className="p-2 border rounded"
              minDate={new Date()}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Time Slot (HH:MM)</label>
            <input
              type="time"
              value={newTimeSlot}
              onChange={(e) => setNewTimeSlot(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <button
            onClick={handleAddTimeSlot}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Slot
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Your Availability</h3>
        {availability.length === 0 ? (
          <p>No availability slots added yet.</p>
        ) : (
          <div className="space-y-4">
            {availability.map((day) => (
              <div key={day.date} className="border p-4 rounded">
                <h4 className="font-medium">{new Date(day.date).toDateString()}</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {day.timeSlots.map((time, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Availability;