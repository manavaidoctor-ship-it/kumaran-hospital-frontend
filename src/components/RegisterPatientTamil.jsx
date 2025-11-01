import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Stethoscope, ClipboardList, Home, LogOut } from "lucide-react";

export default function RegisterPatientTamil() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCamp, setActiveCamp] = useState(null);
  const [isDoctorOpen, setIsDoctorOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    relative_name: "",
    village: "",
    panchayat: "",
    union_name: "",
    age: "",
    gender: "ஆண்",
    phone: "",
    reason: "",
    doctor: "",
  });

  // ✅ Load active camp (from URL or localStorage)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const campId = params.get("campId");

    if (campId) {
      // Fetch the selected camp from backend
      axios
        .get("https://kumaran-hospital-backend-server.onrender.com/api/camps")
        .then((res) => {
          const campData = res.data.find((c) => c.camp_id == campId);
          if (campData) {
            setActiveCamp(campData);
            localStorage.setItem("activeCamp", JSON.stringify(campData));
          } else {
            alert("⚠️ முகாம் விவரங்களை கண்டுபிடிக்க முடியவில்லை!");
            navigate("/");
          }
        })
        .catch((err) => {
          console.error("❌ முகாம் தகவல் ஏற்றுவதில் பிழை:", err);
          alert("⚠️ முகாம் விவரங்களை ஏற்ற முடியவில்லை!");
          navigate("/");
        });
    } else {
      // Fallback if not opened from Camp Report
      const camp = localStorage.getItem("activeCamp");
      if (camp) setActiveCamp(JSON.parse(camp));
      else {
        alert("⚠️ முதலில் புதிய முகாம் தொடங்கவும்!");
        navigate("/");
      }
    }
  }, [location, navigate]);

  const doctors = [
    {
      name: "டாக்டர் PL. விஜயகுமார்",
      qualification: "MS, MCh (Ortho)",
      specialization: "எலும்பு மூட்டு மற்றும் முதுகெலும்பு அறுவை சிகிச்சை நிபுணர்",
    },
    {
      name: "டாக்டர் C.பழனியப்பன்",
      qualification: "MD(Gen.Med), F.ECHO, C.Diab",
      specialization: "பொது மருத்துவம் , இருதயம் மற்றும் சர்க்கரை நோய் நிபுணர்",
    },
    {
      name: "டாக்டர் C.ரேணுகா தேவி",
      qualification: "MD (PAED)",
      specialization: "குழந்தைகள் மற்றும் பச்சிளம் குழந்தைகள் நல சிறப்பு மருத்துவர்",
    },
    {
      name: "டாக்டர் M.ஜெயப்பிரியா",
      qualification: "M.B.B.S, DGO",
      specialization: "மகளிர் மற்றும் மகப்பேறு சிறப்பு மருத்துவர்",
    },
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleDoctorSelect = (doc) => {
    setForm({ ...form, doctor: doc.name });
    setIsDoctorOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!activeCamp?.camp_id) {
        alert("⚠️ முகாம் விவரங்கள் கிடைக்கவில்லை!");
        return;
      }

      const data = { ...form, camp_id: activeCamp.camp_id };
      const res = await axios.post("https://kumaran-hospital-backend-server.onrender.com/api/patients", data);

      if (res.data && res.data.patient_id) {
        alert("✅ நோயாளர் பதிவு வெற்றிகரமாக முடிந்தது!");
        // Open OP chit in new tab
        window.open(`/opchit/${res.data.patient_id}`, "_blank");
      } else {
        alert("⚠️ நோயாளர் ஐடி பெற முடியவில்லை!");
      }
    } catch (error) {
      console.error(error);
      alert("❌ நோயாளர் பதிவில் பிழை ஏற்பட்டது!");
    }
  };

  return (
    <div
      className="min-h-screen flex bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/hospital-building.jpg')",
      }}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-[#002b3d]/80 p-6 flex flex-col justify-between shadow-xl">
        <div>
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-cyan-300">
              ஸ்ரீ குமரன் மருத்துவமனை
            </h1>
            <p className="text-sm text-gray-300">மணப்பாறை</p>
          </div>

          <nav className="space-y-4">
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/50 transition"
            >
              <Home className="w-5 h-5 text-cyan-400" />
              <span>முகாம் தொடங்குக</span>
            </button>

            <button
              onClick={() => navigate("/register")}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-cyan-500 text-white shadow-md"
            >
              <ClipboardList className="w-5 h-5" />
              <span>நோயாளர் பதிவு</span>
            </button>

            <button
              onClick={() => navigate("/campreport")}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 transition"
            >
              <Stethoscope className="w-5 h-5 text-emerald-400" />
              <span>முகாம் அறிக்கை</span>
            </button>
          </nav>
        </div>

        <button className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-red-400 transition">
          <LogOut className="w-4 h-4" /> வெளியேறு
        </button>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="flex items-center gap-12 bg-white/85 text-gray-900 p-8 rounded-2xl shadow-2xl max-w-5xl w-full">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <h2 className="text-2xl font-bold text-[#003b5c] mb-4 text-center">
              நோயாளர் பதிவு
            </h2>

            {activeCamp && (
              <p className="text-sm text-center text-gray-600 mb-4">
                🏕️ முகாம்: <b>{activeCamp.camp_name}</b> | 📍{" "}
                {activeCamp.location} | 📅 {activeCamp.camp_date?.slice(0, 10)}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="பெயர்"
                value={form.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                name="relative_name"
                placeholder="உறவினர் பெயர்"
                value={form.relative_name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                name="village"
                placeholder="கிராமம்"
                value={form.village}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                name="panchayat"
                placeholder="ஊராட்சி"
                value={form.panchayat}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                name="union_name"
                placeholder="ஒன்றியம்"
                value={form.union_name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <div className="flex gap-2">
                <input
                  name="age"
                  placeholder="வயது"
                  value={form.age}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-1/2"
                />
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-1/2"
                >
                  <option>ஆண்</option>
                  <option>பெண்</option>
                  <option>மற்றவை</option>
                </select>
              </div>
              <input
                name="phone"
                placeholder="மொபைல் எண்"
                value={form.phone}
                onChange={handleChange}
                className="col-span-2 border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                name="reason"
                placeholder="வருகை காரணம்"
                value={form.reason}
                onChange={handleChange}
                className="col-span-2 border border-gray-300 rounded-lg px-4 py-2"
              />

              {/* Doctor Dropdown */}
              <div className="col-span-2 relative">
                <button
                  type="button"
                  onClick={() => setIsDoctorOpen(!isDoctorOpen)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-left bg-gray-100"
                >
                  {form.doctor || "மருத்துவரை தேர்ந்தெடுக்கவும்"}
                </button>

                {isDoctorOpen && (
                  <div className="absolute z-50 mt-2 w-full bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
                    {doctors.map((doc, index) => (
                      <div
                        key={index}
                        onClick={() => handleDoctorSelect(doc)}
                        className="px-4 py-2 hover:bg-cyan-100 cursor-pointer border-b border-gray-100"
                      >
                        <p className="font-semibold text-[#035a4a]">{doc.name}</p>
                        <p className="text-sm text-gray-700">{doc.qualification}</p>
                        <p className="text-xs text-gray-500 italic">
                          {doc.specialization}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                💾 Save & Print OP Chit
              </button>
              <button
                type="button"
                onClick={() => navigate("/campreport")}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
              >
                📋 View Camp Report
              </button>
            </div>
          </motion.form>

          {/* Doctor Photo on Right */}
          <div className="flex flex-col items-center justify-center">
            <img
              src="/doctor.jpg"
              alt="Dr Vijayakumar"
              className="w-48 h-48 rounded-full border-4 border-cyan-400 shadow-xl object-cover"
            />
            <p className="font-semibold text-[#003b5c] mt-3 text-lg">
              டாக்டர் பி.எல். விஜயகுமார்
            </p>
            <p className="text-sm text-gray-600">MS(Ortho), MCh</p>
          </div>
        </div>
      </div>
    </div>
  );
}
