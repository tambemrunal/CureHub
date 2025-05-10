import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const MedicineAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputMethod, setInputMethod] = useState("upload");
  const [cameraActive, setCameraActive] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const BASE_URL = "http://localhost:8000";

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // Once cameraActive & streamRef are set, hook up the video element
  useEffect(() => {
    if (cameraActive && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current
        .play()
        .catch((err) => setError("Could not play camera: " + err.message));
    }
  }, [cameraActive]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select or capture an image first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/analyze-medicine/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setAnalysisResult(data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred during analysis."
      );
      setAnalysisResult(null);
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const startCamera = async () => {
    try {
      setError("");
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: 1280, height: 720 },
      });
      streamRef.current = stream;
      setCameraActive(true);
    } catch (err) {
      setError("Camera error: " + err.message);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        const file = new File([blob], "captured.jpg", {
          type: "image/jpeg",
          lastModified: Date.now(),
        });
        setSelectedFile(file);
        setAnalysisResult(null);
        stopCamera();
      },
      "image/jpeg",
      0.9
    );
  };

  const switchInputMethod = (method) => {
    setInputMethod(method);
    setSelectedFile(null);
    setError("");
    if (method === "upload") stopCamera();
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setError("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 max-w-xl w-full bg-white rounded-xl shadow-lg space-y-6 mx-auto"
    >
      <motion.h2
        className="text-2xl font-bold text-center text-blue-700"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        Medicine Analyzer
      </motion.h2>

      {/* Input Method Selector */}
      <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-inner">
        <p className="text-sm text-gray-600 mb-4">
          Choose an image input method:
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {["upload", "camera"].map((mode) => (
            <motion.button
              key={mode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => switchInputMethod(mode)}
              className={`flex-1 py-3 px-4 rounded-lg text-center transition-colors ${
                inputMethod === mode
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {mode === "upload" ? "Upload Image" : "Use Camera"}
            </motion.button>
          ))}
        </div>

        {/* Upload UI */}
        {inputMethod === "upload" && (
          <div className="text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerFileInput}
              className="w-full border-2 border-dashed border-blue-300 p-6 rounded-lg bg-blue-50 hover:bg-blue-100"
            >
              Click to browse files
              <p className="text-sm text-blue-400 mt-1">or drag & drop</p>
            </motion.button>
          </div>
        )}

        {/* Camera UI */}
        {inputMethod === "camera" && (
          <div className="text-center space-y-4">
            {!cameraActive ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startCamera}
                className="w-full border-2 border-dashed border-green-300 p-6 rounded-lg bg-green-50 hover:bg-green-100"
              >
                Start Camera
                <p className="text-sm text-green-400 mt-1">
                  Take a photo of your medicine
                </p>
              </motion.button>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full rounded-lg mx-auto"
                />
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={captureImage}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg"
                  >
                    Capture
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={stopCamera}
                    className="flex-1 py-3 bg-gray-500 text-white rounded-lg"
                  >
                    Cancel
                  </motion.button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Preview */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">Image Preview:</p>
            <button
              onClick={clearSelection}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="w-full max-h-60 object-contain mx-auto rounded-lg shadow-inner"
          />
        </motion.div>
      )}

      {/* Analyze Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleUpload}
        disabled={loading || !selectedFile}
        className={`w-full py-3 rounded-lg text-white ${
          !selectedFile
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } ${loading ? "animate-pulse" : ""}`}
      >
        {loading ? "Analyzing..." : "Analyze Medicine"}
      </motion.button>

      {/* Error */}
      {error && (
        <motion.div className="text-red-600 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
          <strong>Error:</strong> {error}
        </motion.div>
      )}

      {/* Result */}
      {analysisResult && (
        <motion.div className="mt-6">
          <div className="text-green-700 font-medium mb-2">
            Analysis Result
          </div>
          <div className="border p-5 rounded-lg bg-gray-50 shadow-inner prose">
            <ReactMarkdown>{analysisResult.analysis}</ReactMarkdown>
          </div>
        </motion.div>
      )}

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </motion.div>
  );
};

export default MedicineAnalyzer;
