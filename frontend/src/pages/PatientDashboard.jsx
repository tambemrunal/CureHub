import React, { useState } from "react";
import DashboardLayout from "../components/patient/DashboardLayout";
import BookAppointment from "../components/patient/BookAppointment";
import AppointmentsHistory from "../components/patient/AppointmentsHistory";
import EditProfile from "../components/patient/EditProfile";
import { Calendar, User, ClipboardList } from "lucide-react";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("book");

  const tabs = [
    { id: "book", label: "Book Appointment", icon: <ClipboardList size={18} /> },
    { id: "history", label: "Appointment History", icon: <Calendar size={18} /> },
    { id: "profile", label: "Edit Profile", icon: <User size={18} /> },
  ];

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="max-w-6xl mx-auto">
       
        
       

        <div className="p-1">
          <div className="transition-opacity duration-300">
            {activeTab === "book" && <BookAppointment />}
            {activeTab === "history" && <AppointmentsHistory />}
            {activeTab === "profile" && <EditProfile />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
