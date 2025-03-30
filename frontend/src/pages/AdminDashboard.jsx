// frontend/src/pages/AdminDashboard.jsx
import React from "react";
import AddDoctor from "../components/Admin/AddDoctor";
import DoctorList from "../components/Admin/DoctorList";

function AdminDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <AddDoctor />
        </div>
        <div>
          <DoctorList />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
