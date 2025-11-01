import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CampReport() {
  const [camps, setCamps] = useState([]);
  const [selectedCampId, setSelectedCampId] = useState("");
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [patients, setPatients] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // ✅ Load all camps for dropdown
  useEffect(() => {
    axios
      .get("https://kumaran-hospital-backend-server.onrender.com/api/camps")
      .then((res) => setCamps(res.data))
      .catch(() => setErrorMsg("⚠️ முகாம் விவரங்களை ஏற்ற முடியவில்லை!"));
  }, []);

  // ✅ Fetch patients when a camp is selected
  useEffect(() => {
    if (selectedCampId) {
      const campData = camps.find((c) => c.camp_id == selectedCampId);
      setSelectedCamp(campData);

      axios
        .get(`https://kumaran-hospital-backend-server.onrender.com/api/patients/camp/${selectedCampId}`)
        .then((res) => setPatients(res.data))
        .catch(() => setErrorMsg("நோயாளர் விவரங்களை பெற முடியவில்லை!"));
    }
  }, [selectedCampId, camps]);

  // ✅ Delete patient
  const handleDelete = async (id) => {
    if (!window.confirm("இந்த நோயாளியை நீக்க விரும்புகிறீர்களா?")) return;

    try {
      await axios.delete(`https://kumaran-hospital-backend-server.onrender.com/api/patients/${id}`);
      alert("✅ நோயாளர் வெற்றிகரமாக நீக்கப்பட்டார்!");
      setPatients((prev) => prev.filter((p) => p.patient_id !== id));
    } catch {
      alert("❌ பிழை: நோயாளியை நீக்க முடியவில்லை!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6 print:bg-white">
      <div className="w-[95%] max-w-[1000px] bg-white border border-gray-400 shadow-lg rounded-lg p-6 print:shadow-none print:border-none">
        {/* 🏥 Header */}
        <div className="text-center border-b border-gray-400 pb-4 mb-4">
          <h1 className="text-3xl font-extrabold text-[#003b5c]">
            ஸ்ரீ குமரன் மருத்துவமனை
          </h1>
          <p className="text-lg text-gray-600 font-semibold">
            டாக்டர் பி.எல். விஜயகுமார் அறக்கட்டளை
          </p>
          <p className="text-sm text-gray-500 italic">
            இலவச மருத்துவ முகாம் - தினசரி அறிக்கை
          </p>
        </div>

        {/* 🏕️ Camp Selection Dropdown */}
        <div className="mb-6 flex flex-col sm:flex-row items-center gap-3 justify-center">
          <label className="font-semibold text-gray-700">
            🏕️ முகாமைத் தேர்ந்தெடுக்கவும்:
          </label>
          <select
            value={selectedCampId}
            onChange={(e) => setSelectedCampId(e.target.value)}
            className="border border-gray-400 rounded-lg px-3 py-2 w-[250px]"
          >
            <option value="">-- முகாமைத் தேர்ந்தெடுக்கவும் --</option>
            {camps.map((camp) => (
              <option key={camp.camp_id} value={camp.camp_id}>
                {camp.camp_name} ({camp.location})
              </option>
            ))}
          </select>
        </div>

        {/* 🏕️ Camp Info */}
        {selectedCamp && (
          <div className="border border-gray-400 rounded-lg p-4 mb-4 bg-[#f5fbff]">
            <h2 className="text-xl font-bold text-[#004b5f] mb-2">
              📋 முகாம் விவரங்கள்
            </h2>
            <div className="grid grid-cols-2 text-sm font-semibold text-gray-800 gap-2">
              <p>
                <span className="text-gray-600">முகாம் பெயர்:</span>{" "}
                {selectedCamp.camp_name}
              </p>
              <p>
                <span className="text-gray-600">முகாம் தேதி:</span>{" "}
                {selectedCamp.camp_date?.slice(0, 10) || "—"}
              </p>
              <p>
                <span className="text-gray-600">இடம்:</span>{" "}
                {selectedCamp.location || "—"}
              </p>
              <p>
                <span className="text-gray-600">மொத்த நோயாளிகள்:</span>{" "}
                {patients.length}
              </p>
            </div>
          </div>
        )}

        {/* 📋 Patient Table */}
        {selectedCampId && (
          <div className="overflow-x-auto border border-gray-300 rounded-lg">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-[#eaf7ff] border-b border-gray-400">
                <tr className="text-left">
                  <th className="border p-2 text-center">#</th>
                  <th className="border p-2">பெயர்</th>
                  <th className="border p-2">உறவினர் பெயர்</th>
                  <th className="border p-2">கிராமம்</th>
                  <th className="border p-2">வயது / பாலினம்</th>
                  <th className="border p-2">மொபைல்</th>
                  <th className="border p-2">மருத்துவர்</th>
                  <th className="border p-2">வருகை காரணம்</th>
                  <th className="border p-2 text-center print:hidden">நீக்கு</th>
                </tr>
              </thead>
              <tbody>
                {patients.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-4 text-gray-500 font-medium"
                    >
                      நோயாளர் பதிவுகள் எதுவும் இல்லை
                    </td>
                  </tr>
                ) : (
                  patients.map((p, i) => (
                    <tr
                      key={p.patient_id}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border p-2 text-center">{i + 1}</td>
                      <td className="border p-2 font-semibold">{p.name}</td>
                      <td className="border p-2">{p.relative_name}</td>
                      <td className="border p-2">{p.village}</td>
                      <td className="border p-2">
                        {p.age} / {p.gender}
                      </td>
                      <td className="border p-2">{p.phone}</td>
                      <td className="border p-2">{p.doctor}</td>
                      <td className="border p-2">{p.reason}</td>
                      <td className="border p-2 text-center print:hidden">
                        <button
                          onClick={() => handleDelete(p.patient_id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-semibold"
                        >
                          🗑️ நீக்கு
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 🖨️ Footer */}
        {selectedCampId && (
          <div className="text-center mt-6 print:hidden flex justify-center gap-3">
            <button
              onClick={() => navigate("/register?campId=" + selectedCampId)}
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
            >
              ➕ புதிய நோயாளியைச் சேர்க்கவும்
            </button>

            <button
              onClick={() => window.print()}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
            >
              🖨️ முகாம் அறிக்கையை அச்சிடு
            </button>
          </div>
        )}

        <div className="text-center text-sm text-gray-600 mt-6 print:block hidden">
          <p>🏥 ஸ்ரீ குமரன் மருத்துவமனை, விராலிமலை ரோடு, மணப்பாறை</p>
          <p>📞 7603981515 · 7397391444</p>
        </div>
      </div>
    </div>
  );
}
