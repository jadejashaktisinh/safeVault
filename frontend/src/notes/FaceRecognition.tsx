import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

type FaceRecognitionProps = {
  mode?: "save" | "verify";
  userId: string | null;
};

const FaceRecognition: React.FC<FaceRecognitionProps> = ({
  mode = "save",
  userId,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<string>("");

  // Load models and start video
  useEffect(() => {
    const loadModels = async () => {
      try {
        setStatus("Loading models...");
        
        await Promise.all([
          faceapi.nets.faceRecognitionNet.loadFromUri('/models/face_recognition/'),
          faceapi.nets.tinyFaceDetector.loadFromUri('/models/tiny_face_detector/'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models/face_landmark_68/'),
        ]);

       
        startVideo();
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    loadModels();
  }, []);

  const startVideo = () => {
    console.log("web cam")
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
        setStatus("🚫 Unable to access webcam");
      });
  };

  const handleCapture = async () => {
    setStatus("Detecting...");

    if (!videoRef.current) {
      setStatus("🚫 No video reference");
      return;
    }

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      setStatus("❌ No face detected.");
      return;
    }

    const descriptor = detection.descriptor;
    console.log(descriptor);
    
    if(mode === "save"){
      localStorage.setItem("faceDescriptor", JSON.stringify(Array.from(descriptor)));
    }
    else{
      console.log(JSON.parse(localStorage.getItem("faceDescriptor") || "[]"));
      const faceMatcher = new faceapi.FaceMatcher([new Float32Array(JSON.parse(localStorage.getItem("faceDescriptor") || "[]"))][0]);
      const bestMatch = faceMatcher.findBestMatch(descriptor);
      console.log(bestMatch);
      setStatus(bestMatch.distance < 0.5 ? "✅ Face match!" : "❌ Face did not match.");
    }

    try {
      // const res = await fetch(
      //   mode === "save" ? "/api/save-face" : "/api/verify-face",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ userId, descriptor }),
      //   }
      // );

      //const data = await res.json();

      if (mode === "save") {

        setStatus("✅ Face saved successfully!");
      } else {
      
        // setStatus("✅ Face match!");
      }
    } catch (error) {
      console.error("Error during face API:", error);
      setStatus("🚫 Server error. Try again later.");
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
        className="w-full rounded border-2 border-gray-300"
      />

      <button
        onClick={handleCapture}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-medium"
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
