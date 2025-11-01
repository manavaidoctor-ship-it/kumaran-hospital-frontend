import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewCamp() {
  const navigate = useNavigate();
  const [campName, setCampName] = useState("");
  const [campDate, setCampDate] = useState("");
  const [location, setLocation] = useState("");
  const [existingCamps, setExistingCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState("");

  useEffect(() => {
    axios.get("https://kumaran-hospital-backend-server.onrender.com/api/camps")
      .then(res => setExistingCamps(res.data))
      .catch(() => console.error("Failed to load camps"));
  }, []);

  const handleCreateCamp = async () => {
    if (!campName || !campDate || !location) {
      alert("⚠️ முகாம் பெயர், தேதி, மற்றும் இடம் தேவை!");
      return;
    }
    try {
      const res = await axios.post("https://kumaran-hospital-backend-server.onrender.com/api/camps", {
        camp_name: campName,
        camp_date: campDate,
        location,
      });
      alert("✅ புதிய முகாம் உருவாக்கப்பட்டது!");
      navigate(`/register?campId=${res.data.camp_id}`);
    } catch (err) {
      alert("❌ முகாம் உருவாக்க முடியவில்லை!");
    }
  };

  const handleGoToExisting = () => {
    if (!selectedCamp) {
      alert("⚠️ ஒரு முகாமைத் தேர்ந்தெடுக்கவும்!");
      return;
    }
    navigate(`/register?campId=${selectedCamp}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-green-100 flex justify-center items-center">
      <div className="bg-white/90 shadow-lg rounded-2xl p-8 w-[400px] text-center">
        <h1 className="text-2xl font-bold text-[#04566a] mb-2">
          🏥 ஸ்ரீ குமரன் மருத்துவமனை
        </h1>
        <p className="text-sm text-gray-600 mb-4">மணப்பாறை</p>

        <h2 className="text-xl font-semibold text-green-700 mb-3">
          🏕 புதிய முகாம் தொடங்கவும்
        </h2>

        <input
          type="text"
          placeholder="முகாம் பெயர்"
          value={campName}
          onChange={(e) => setCampName(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="date"
          value={campDate}
          onChange={(e) => setCampDate(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="முகாம் இடம்"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <button
          onClick={handleCreateCamp}
          className="w-full bg-sky-600 text-white py-2 rounded-lg font-semibold hover:bg-sky-700"
        >
          ✏️ முகாம் தொடங்கவும்
        </button>

        <p className="text-gray-500 mt-4 mb-2">அல்லது</p>

        <select
          value={selectedCamp}
          onChange={(e) => setSelectedCamp(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        >
          <option value="">-- ஏற்கனவே உள்ள முகாமைத் தேர்ந்தெடுக்கவும் --</option>
          {existingCamps.map((camp) => (
            <option key={camp.camp_id} value={camp.camp_id}>
              {camp.camp_name} ({camp.location})
            </option>
          ))}
        </select>

        <button
          onClick={handleGoToExisting}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
        >
          ➡️ தொடரவும்
        </button>
      </div>
    </div>
  );
}
