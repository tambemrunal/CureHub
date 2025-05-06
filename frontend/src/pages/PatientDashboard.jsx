import React, { useState } from "react";
import DashboardLayout from "../components/patient/DashboardLayout";
import BookAppointment from "../components/patient/BookAppointment";
import AppointmentsHistory from "../components/patient/AppointmentsHistory";
import EditProfile from "../components/patient/EditProfile";
import { Calendar, User, ClipboardList } from "lucide-react";
import Chatbot from "../components/patient/Chatbot";
import FileUpload from "../components/patient/FileUpload";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("book");

  const tabs = [
    { id: "book", label: "Book Appointment", icon: <ClipboardList size={18} /> },
    { id: "history", label: "Appointment History", icon: <Calendar size={18} /> },
    { id: "profile", label: "Edit Profile", icon: <User size={18} /> },
    { id: "chatbot", label: "ChatBot", icon: <User size={18} /> },
    { id: "analyzer", label: "analyzer", icon: <User size={18} /> },
  ];

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="max-w-6xl mx-auto">
       
        
       

        <div className="p-1">
          <div className="transition-opacity duration-300">
            {activeTab === "book" && <BookAppointment />}
            {activeTab === "history" && <AppointmentsHistory setActiveTab={setActiveTab} />}
            {activeTab === "profile" && <EditProfile />}
            {activeTab === "chatbot" && <Chatbot/>}
            {activeTab === "analyzer" && <FileUpload/>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
