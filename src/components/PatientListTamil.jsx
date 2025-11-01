import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PatientListTamil() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("https://kumaran-hospital-backend-server.onrender.com/api/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Error fetching patients", err));
  }, []);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-700">
            🏥 மொத்த மருத்துவ முகாம் நோயாளிகள் பட்டியல்
          </h1>
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            🖨️ Print List
          </button>
        </div>

        <table className="w-full border border-gray-300">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="p-2 border">பெயர்</th>
              <th className="p-2 border">உறவினர்</th>
              <th className="p-2 border">கிராமம்</th>
              <th className="p-2 border">வயது</th>
              <th className="p-2 border">பாலினம்</th>
              <th className="p-2 border">மொபைல் எண்</th>
              <th className="p-2 border">மருத்துவர்</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, i) => (
              <tr key={i} className="text-center border-t hover:bg-gray-50">
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.relative_name}</td>
                <td className="p-2 border">{p.village}</td>
                <td className="p-2 border">{p.age}</td>
                <td className="p-2 border">{p.gender}</td>
                <td className="p-2 border">{p.phone}</td>
                <td className="p-2 border">{p.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
