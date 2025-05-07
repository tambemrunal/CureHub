import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const DoctorRecommendation = () => {
  const [symptoms, setSymptoms] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // This would ideally come from your backend or a constants file
  const symptomsToSpecialization = [
    { symptom: "fever", specialization: "General Physician" },
    { symptom: "cough", specialization: "Pulmonologist" },
    { symptom: "headache", specialization: "Neurologist" },
    { symptom: "chest pain", specialization: "Cardiologist" },
    { symptom: "stomach ache", specialization: "Gastroenterologist" },
    // Add more symptom-specialization mappings as needed
  ];

  const handleRecommendations = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convert input string to array of symptoms
      const symptomsArray = symptoms
        .split(",")
        .map((s) => s.trim().toLowerCase());

      if (!symptomsArray.length) {
        throw new Error("Please enter at least one symptom");
      }

      // You can either:
      // Option 1: Call your backend API
      const response = await axios.post("/api/patient/recommendations", {
        symptoms: symptomsArray,
      });
      setRecommendations(response.data.doctors);

      // OR Option 2: Process locally (if you have all data in frontend)
      /* Commented code remains the same */
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-xl">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-blue-800 mb-8"
      >
        Find Doctors Based on Your Symptoms
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleRecommendations}
        className="mb-8 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="symptoms"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter your symptoms (comma separated):
          </label>
          <input
            type="text"
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. fever, cough, headache"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching...
            </div>
          ) : (
            "Find Doctors"
          )}
        </button>
      </motion.form>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md"
        >
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-red-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </motion.div>
      )}

      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="recommendations-results"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Recommended Doctors:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((doctor, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                key={doctor._id || doctor.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2"></div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    Dr. {doctor.name}
                  </h4>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center">
                      <span className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                      <span className="font-medium">Specialization:</span>{" "}
                      {doctor.specialization}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                      <span className="font-medium">Experience:</span>{" "}
                      {doctor.experience} years
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </span>
                      <span className="font-medium">Hospital:</span>{" "}
                      {doctor.hospital}
                    </p>
                    {/* Add more doctor details as needed */}
                  </div>
                  <div className="mt-6">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DoctorRecommendation;
