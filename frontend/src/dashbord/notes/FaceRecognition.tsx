import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useNavigate, useParams } from "react-router-dom";

type FaceRecognitionProps = {
  mode?: "save" | "verify";
  type?: string,
};

const FaceRecognition: React.FC<FaceRecognitionProps> = ({
  mode = "save",
  type,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<string>("Loading models...");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
        setStatus("🚫 Unable to access webcam");
      });
  };

  const stopVideo = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    const loadModels = async () => {
      try {
        setStatus("Loading models...");
        await Promise.all([
          faceapi.nets.faceRecognitionNet.loadFromUri("/models/face_recognition/"),
          faceapi.nets.tinyFaceDetector.loadFromUri("/models/tiny_face_detector/"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models/face_landmark_68/"),
        ]);
        setStatus("Models loaded. Starting webcam...");
        setLoading(false);
        startVideo();
      } catch (error) {
        console.error("Error loading models:", error);
        setStatus("🚫 Error loading models");
      }
    };
    loadModels();
  }, []);

  const handleCapture = async () => {
    if (!videoRef.current) {
      setStatus("🚫 No video reference");
      return;
    }

    setStatus("Detecting face...");
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      setStatus("❌ No face detected.");
      return;
    }

    const descriptor = detection.descriptor;

    if (mode === "save") {
      localStorage.setItem("faceDescriptor", JSON.stringify(Array.from(descriptor)));
      setStatus("✅ Face saved successfully!");
      stopVideo();
    } else {
      const savedDescriptor = localStorage.getItem("faceDescriptor");
      if (!savedDescriptor) {
        setStatus("❌ No saved face found!");
        return;
      }
      const floatDescriptor = new Float32Array(JSON.parse(savedDescriptor));
      const labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors("user", [floatDescriptor]);
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

      const bestMatch = faceMatcher.findBestMatch(descriptor);
      setStatus(
        bestMatch.distance < 0.6 ? "✅ Face match!" : "❌ Face did not match."
      );

      bestMatch.distance < 0.6 ? navigate(`/${type}/${id}`) : "❌ Face did not match."

      stopVideo();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-center space-y-4">
      <h2 className="text-2xl font-bold text-indigo-600">
        {mode === "save" ? "Register Face" : "Verify Face"}
      </h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        width={320}
        height={240}
        className="w-full rounded border-2 border-gray-300"
      />
      <button
        onClick={handleCapture}
        disabled={loading}
        className={`mt-4 px-6 py-2 rounded font-medium text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
      >
        {mode === "save" ? "Save Face" : "Verify Face"}
      </button>
      {status && (
        <div className="mt-4 text-sm font-medium text-gray-700">{status}</div>
      )}
    </div>
  );
};

export default FaceRecognition;
