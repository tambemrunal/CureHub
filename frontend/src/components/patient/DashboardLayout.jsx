import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  ClipboardList,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  FileText,
  Video,
  UserCheck,
  Pill,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { toast } from "react-toastify";
import PopupModal from "../../model/PopUpModal";

const DashboardLayout = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [animate, setAnimate] = useState(false);

  // Add animation effect when component mounts
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Example of menu grouping - could be expanded with sub-items
  const menuGroups = {
    appointments: [
      {
        id: "book",
        icon: <ClipboardList size={17} />,
        label: "Book Appointment",
      },
      {
        id: "history",
        icon: <Calendar size={17} />,
        label: "Appointment History",
      },
    ],
    tools: [
      {
        id: "chatbot",
        icon: <MessageSquare size={17} />,
        label: "Symptom Checker",
      },
      {
        id: "analyzer",
        icon: <FileText size={17} />,
        label: "Report Analyzer",
      },
      {
        id: "MedicineAnalyzer",
        icon: <Pill size={17} />,
        label: "Medicine Analyzer",
      },
    ],
    discover: [
      {
        id: "MedicalVideoSearch",
        icon: <Video size={17} />,
        label: "Medical Videos",
      },
      {
        id: "DoctorRecommendation",
        icon: <UserCheck size={17} />,
        label: "Find Doctors",
      },
    ],
    account: [
      {
        id: "profile",
        icon: <User size={17} />,
        label: "Edit Profile",
      },
    ],
  };

  const handleLogout = () => {
    // Add logout animation
    setSidebarOpen(false);
    setTimeout(() => {
      localStorage.removeItem("patientAuth");
      toast.success("Logged out successfully");
    }, 300);
  };

  const showNotification = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const toggleGroup = (group) => {
    setExpanded(expanded === group ? null : group);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-br from-indigo-800 via-indigo-700 to-indigo-900 text-white transition-all duration-300 ease-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 flex flex-col shadow-2xl ${
          animate ? "animate-sidebar-entry" : ""
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-indigo-500/30 bg-indigo-900/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm shadow-inner border border-white/10 transition-all duration-500 hover:scale-110">
              <span className="text-white font-bold text-lg bg-gradient-to-br from-white to-indigo-200 bg-clip-text text-transparent">
                CH
              </span>
            </div>
            <div className="overflow-hidden">
              <h1 className="text-lg font-bold tracking-wide whitespace-nowrap bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent animate-text-shimmer">
                Patient Portal
              </h1>
              <div className="h-0.5 w-full bg-gradient-to-r from-indigo-300 to-transparent rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-full hover:bg-indigo-600/50 transition-colors md:hidden backdrop-blur-sm hover:rotate-90 transform duration-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-styled">
          <nav className="p-3 space-y-6">
            {Object.entries(menuGroups).map(([groupName, items]) => (
              <div key={groupName} className="space-y-1">
                <button
                  onClick={() => toggleGroup(groupName)}
                  className="flex items-center justify-between w-full px-3 py-2 text-xs uppercase font-semibold tracking-wider text-indigo-200/80 hover:text-white transition-colors group"
                >
                  {groupName}
                  <ChevronDown
                    size={14}
                    className={`transform transition-transform duration-200 ${
                      expanded === groupName ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                    expanded === groupName || expanded === null
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-50"
                  }`}
                >
                  {items.map((item) => (
                    <SidebarLink
                      key={item.id}
                      icon={item.icon}
                      label={item.label}
                      active={activeTab === item.id}
                      onClick={() => setActiveTab(item.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="px-3 py-4 border-t border-indigo-500/30 bg-indigo-900/20 backdrop-blur-sm">
          {/* Sidebar Footer */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2.5 mt-2 text-sm font-medium rounded-lg hover:bg-red-500/20 group transition-all duration-300 hover:pl-4"
          >
            <div className="p-1.5 rounded-lg bg-red-500/20 mr-2 group-hover:bg-red-500/30 transition-colors">
              <LogOut
                size={16}
                className="text-red-200 group-hover:text-white transition-colors"
              />
            </div>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              Logout
            </span>
            <div className="ml-auto overflow-hidden">
              <ChevronRight
                size={16}
                className="transform translate-x-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-md md:hidden hover:bg-gray-100 transition-colors"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center ml-auto space-x-4">
            <button
              onClick={() => showNotification("You have no new notifications")}
              className="relative p-2 transition-transform rounded-full hover:bg-gray-100 hover:scale-110"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
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

      {/* Global CSS for animations */}
      <GlobalStyles />
    </div>
  );
};

const SidebarLink = ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-3 py-2.5 text-left transition-all duration-300 rounded-lg group text-sm relative overflow-hidden ${
        active
          ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium shadow-lg"
          : "text-indigo-100 hover:bg-indigo-600/30"
      }`}
    >
      {/* Background hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 to-indigo-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Active indicator */}
      {active && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-2/3 bg-white rounded-r-full shadow-glow animate-pulse-slow" />
      )}

      {/* Icon wrapper */}
      <div
        className={`flex-shrink-0 mr-3 rounded-md p-1.5 transition-all duration-300 ${
          active
            ? "bg-white/20 text-white"
            : "text-indigo-300 group-hover:text-white group-hover:bg-indigo-500/30"
        }`}
      >
        {icon}
      </div>

      {/* Label */}
      <span className="tracking-wide relative z-10">{label}</span>

      {/* Right arrow */}
      <ChevronRight
        size={14}
        className={`ml-auto transition-all duration-200 relative z-10 ${
          active
            ? "translate-x-0 opacity-100"
            : "opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0"
        }`}
      />
    </button>
  );
};

// Global CSS for custom animations and effects
const GlobalStyles = () => (
  <style jsx global>{`
    /* Custom Scrollbar */
    .scrollbar-styled::-webkit-scrollbar {
      width: 5px;
    }

    .scrollbar-styled::-webkit-scrollbar-track {
      background: rgba(99, 102, 241, 0.1);
      border-radius: 10px;
    }

    .scrollbar-styled::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
    }

    .scrollbar-styled::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    /* Firefox scrollbar */
    .scrollbar-styled {
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.2) rgba(99, 102, 241, 0.1);
    }

    /* Shadow glow effect */
    .shadow-glow {
      box-shadow: 0 0 8px 1px rgba(255, 255, 255, 0.5);
    }

    /* Custom animations */
    @keyframes pulse-slow {
      0%,
      100% {
        opacity: 0.8;
      }
      50% {
        opacity: 0.5;
      }
    }

    @keyframes text-shimmer {
      0% {
        background-position: -100%;
      }
      100% {
        background-position: 200%;
      }
    }

    @keyframes sidebar-entry {
      0% {
        transform: translateX(-20px);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }

    /* Animation classes */
    .animate-pulse-slow {
      animation: pulse-slow 3s ease-in-out infinite;
    }

    .animate-text-shimmer {
      background-size: 200% auto;
      animation: text-shimmer 4s linear infinite;
    }

    .animate-sidebar-entry {
      animation: sidebar-entry 0.5s ease-out forwards;
    }
  `}</style>
);

export default DashboardLayout;
