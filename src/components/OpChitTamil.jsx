import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function OpChitTamil() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [opChitNumber, setOpChitNumber] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPatient() {
      try {
        const res = await axios.get(`https://kumaran-hospital-backend-server.onrender.com/api/patients/${id}`);
        setPatient(res.data);

        // Generate OP chit number dynamically
        const year = new Date().getFullYear();
        const chitNo = `OP${year}-${Math.floor(1000 + Math.random() * 9000)}`;
        setOpChitNumber(chitNo);
      } catch (err) {
        alert("❌ நோயாளர் விவரங்களை பெற முடியவில்லை!");
      }
    }
    fetchPatient();
  }, [id]);

  if (!patient)
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-gray-600">
        ⏳ நோயாளர் விவரங்கள் ஏற்றப்படுகிறது...
      </div>
    );

  // ✅ Doctor details mapping (based on selected doctor name)
  const doctorDetails = {
    "டாக்டர் PL. விஜயகுமார்": {
      qualification: "MS, MCh (Ortho)",
      specialization: "எலும்பு மூட்டு மற்றும் முதுகெலும்பு அறுவை சிகிச்சை நிபுணர்",
    },
    "டாக்டர் C.ரேணுகா தேவி": {
      qualification: "MD (PAED)",
      specialization: "குழந்தைகள் மற்றும் பச்சிளம் குழந்தைகள் நல சிறப்பு மருத்துவர்",
    },
    "டாக்டர் C.பழனியப்பன்": {
      qualification: "MD(Gen.Med), F.ECHO, C.Diab",
      specialization: "பொது மருத்துவம் , இருதயம் மற்றும் சர்க்கரை நோய் நிபுணர்",
    },
    "டாக்டர் M.ஜெயப்பிரியா": {
      qualification: "M.B.B.S, DGO",
      specialization: "மகளிர் மற்றும் மகப்பேறு சிறப்பு மருத்துவர்",
    },
  };

  const selectedDoctor = doctorDetails[patient.doctor] || {};

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex justify-center print:p-0 print:bg-white font-[Noto Sans Tamil]">
      <div
        className="w-[900px] bg-white border border-gray-400 rounded-lg shadow-lg flex flex-col justify-between print:shadow-none print-card"
        style={{
          minHeight: "1122px",
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      >
        {/* 🏥 HEADER */}
        <div
          className="text-center px-6 pt-3 pb-2 border-b border-gray-400 relative"
          style={{
            background:
              "linear-gradient(90deg, #e8f9fd 0%, #d4f3f9 50%, #bcecf4 100%)",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            position: "relative",
          }}
        >
          <div className="absolute left-8 top-3 flex items-center justify-center">
            <img
              src="/hospital-logo.png"
              alt="Hospital Logo"
              className="w-[90px] h-[90px] object-contain"
              style={{ filter: "drop-shadow(0 0 3px rgba(0,0,0,0.25))" }}
            />
          </div>

          <div className="flex flex-col items-center justify-center leading-tight text-[#002c3e]">
            <p className="text-[26px] font-semibold mb-1 tracking-wide">மணப்பாறை</p>
            <h1 className="text-[32px] font-extrabold tracking-wide drop-shadow-sm text-[#004d63]">
              ஸ்ரீ குமரன் மருத்துவமனை
            </h1>
            <div
              style={{
                width: "200px",
                height: "2px",
                background: "linear-gradient(90deg, #f0c75e, #f9e076, #f0c75e)",
                borderRadius: "2px",
                margin: "4px 0 6px 0",
              }}
            />
            <p className="text-[18px] font-bold text-[#013844]">
              டாக்டர் PL. விஜயகுமார் அறக்கட்டளை
            </p>
            <p className="text-[15px] font-semibold mt-0.5 text-[#045661]">
              இலவச மருத்துவ முகாம்
            </p>
          </div>
        </div>

        {/* 👤 PATIENT INFO */}
        <div className="px-6 py-3 text-[14px]">
          <table className="w-full border-collapse border border-gray-400">
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 font-semibold w-[20%]">பெயர்</td>
                <td className="border border-gray-400 p-2 w-[30%]">{patient.name}</td>
                <td className="border border-gray-400 p-2 font-semibold w-[25%]">OP சீட்டு எண்</td>
                <td className="border border-gray-400 p-2 text-[#004d63] font-bold">
                  {opChitNumber}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-semibold">உறவினர் பெயர்</td>
                <td className="border border-gray-400 p-2">{patient.relative_name}</td>
                <td className="border border-gray-400 p-2 font-semibold">கிராமம்</td>
                <td className="border border-gray-400 p-2">{patient.village}</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-semibold">ஊராட்சி</td>
                <td className="border border-gray-400 p-2">{patient.panchayat}</td>
                <td className="border border-gray-400 p-2 font-semibold">ஒன்றியம்</td>
                <td className="border border-gray-400 p-2">{patient.union_name}</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-semibold">வயது / பாலினம்</td>
                <td className="border border-gray-400 p-2">
                  {patient.age} / {patient.gender}
                </td>
                <td className="border border-gray-400 p-2 font-semibold">மொபைல் எண்</td>
                <td className="border border-gray-400 p-2">{patient.phone}</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-semibold">வருகை காரணம்</td>
                <td className="border border-gray-400 p-2">{patient.reason}</td>
                <td className="border border-gray-400 p-2 font-semibold">மருத்துவர்</td>
                <td className="border border-gray-400 p-2 leading-tight">
                  <span className="font-bold text-[#034c44]">
                    {patient.doctor}
                    {selectedDoctor.qualification && (
                      <>
                        , {selectedDoctor.qualification}
                        <br />
                        <span className="text-[13px] text-[#02695a] italic">
                          {selectedDoctor.specialization}
                        </span>
                      </>
                    )}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 📊 VITALS */}
        <div className="flex justify-between border-t border-gray-400 text-[14px] px-6 py-2 font-semibold bg-gray-50">
          <span>PR: _______</span>
          <span>BP: _______</span>
          <span>SPO₂: _______</span>
          <span>TEMP: _______</span>
          <span>WT: _______</span>
          <span>HT: _______</span>
        </div>

        {/* 💊 PRESCRIPTION + VOUCHERS */}
        <div className="flex border-t border-gray-400 flex-1">
          <div className="w-[75%] border-r border-gray-400 h-full"></div>
          <div className="w-[25%] flex flex-col text-center border-l border-gray-400 text-[14px] font-semibold">
            <div className="flex-1 border-b border-gray-400 flex items-center justify-center">X-RAY</div>
            <div className="flex-1 border-b border-gray-400 flex items-center justify-center">USG</div>
            <div className="flex-1 border-b border-gray-400 flex items-center justify-center">CT</div>
            <div className="flex-1 flex items-center justify-center">MRI</div>
          </div>
        </div>

        {/* 📍 FOOTER */}
        <div className="border-t border-gray-400 text-center text-[13px] text-gray-800 py-2 bg-gradient-to-r from-green-50 to-yellow-50 mt-auto">
          <p>🏥 ஸ்ரீ குமரன் மருத்துவமனை, 50/9 விராலிமலை ரோடு, மணப்பாறை - 621306</p>
          <p>📞 7603981515 / 7397391444 · உயர் சிகிச்சை உங்களருகில்</p>
        </div>

        {/* 🖨️ BUTTONS */}
        <div className="text-center py-3 print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
          >
            🖨️ Print OP Sheet
          </button>
          <button
            onClick={() => navigate("/register")}
            className="ml-4 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
