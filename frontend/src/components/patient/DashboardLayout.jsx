import React, { useState } from "react";
import { User, Calendar, ClipboardList, LogOut, Menu, X, ChevronRight, Bell } from "lucide-react";
import { toast } from "react-toastify";
import PopupModal from "../../model/PopUpModal";

const DashboardLayout = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("patientAuth");
    toast.success("Logged out successfully");
  };

  const showNotification = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white transition-all duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-indigo-700">
          <h1 className="text-xl font-bold">Patient Portal</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-full hover:bg-indigo-700 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <nav className="space-y-2">
            <SidebarLink
              icon={<ClipboardList size={20} />}
              label="Book Appointment"
              active={activeTab === "book"}
              onClick={() => setActiveTab("book")}
            />
            <SidebarLink
              icon={<Calendar size={20} />}
              label="Appointment History"
              active={activeTab === "history"}
              onClick={() => setActiveTab("history")}
            />
            <SidebarLink
              icon={<User size={20} />}
              label="Edit Profile"
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-indigo-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-left transition-colors rounded-lg hover:bg-indigo-700"
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded-md md:hidden hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center ml-auto space-x-4">
            <button
              onClick={() => showNotification("You have no new notifications")}
              className="relative p-1 transition-colors rounded-full hover:bg-gray-100"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      {/* Modal */}
      {showModal && (
        <PopupModal
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const SidebarLink = ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 text-left transition-colors rounded-lg group hover:bg-indigo-700 ${
        active ? "bg-indigo-700" : ""
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
      <ChevronRight
        size={16}
        className="ml-auto transition-transform group-hover:translate-x-1"
      />
    </button>
  );
};

export default DashboardLayout;
