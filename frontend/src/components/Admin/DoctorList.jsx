import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminAuth");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/api/admin/doctors", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response.data); // Debugging

      if (Array.isArray(response.data)) {
        setDoctors(response.data);
      } else {
        toast.error("Unexpected API response format.");
        setDoctors([]); // Ensure doctors is always an array
      }

      setLoading(false);
    } catch (error) {
      toast.error("Error fetching doctors");
      setDoctors([]); // Avoid setting doctors to null or undefined
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(`/api/admin/doctors/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Doctor deleted successfully");
        fetchDoctors();
      } catch (error) {
        toast.error("Error deleting doctor");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Doctors</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {doctors.map((doctor) => (
              <tr
                key={doctor._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">{doctor.name}</td>
                <td className="py-3 px-4">{doctor.email}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(doctor._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorList;
