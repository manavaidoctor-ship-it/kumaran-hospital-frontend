import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientForm from "./PatientForm";
import OpChitTamil from "./components/OpChitTamil";

export default function App() {
  const dummy = {
    patient: { id:"KHMC-0001", name:"ரவி", gender:"ஆண்", age:30, address:"கோயம்புத்தூர்", phone:"9876543210" },
    vitals: { bp:"120/80", sugar:"95", temp:"98.4°F", pulse:"72", weight:"68kg" },
    doctor: { name:"டாக்டர் விஜயகுமார்", specialization:"MD", signatureUrl:"/assets/sign-vijay.png" },
    hospital: { name:"ஸ்ரீ குமரன் மருத்துவமனை", tagline:"Assured Special Care", address:"கோயம்புத்தூர் - 641045" },
    camp: { name:"Ward 12 Camp", date:"2025-10-30" }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientForm />} />
        <Route path="/opchit" element={<OpChitTamil {...dummy} />} />
      </Routes>
    </BrowserRouter>
  );
}
