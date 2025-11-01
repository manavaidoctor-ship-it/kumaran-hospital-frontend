import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPatientTamil from "./components/RegisterPatientTamil";
import PatientListTamil from "./components/PatientListTamil";
import OpChitTamil from "./components/OpChitTamil";
import CampReport from "./components/CampReport";
import NewCamp from "./components/NewCamp";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🏕️ Start Page */}
        <Route path="/" element={<NewCamp />} />

        {/* 👩‍⚕️ Register Patient */}
        <Route path="/register" element={<RegisterPatientTamil />} />

        {/* 🧾 Patient List */}
        <Route path="/patients" element={<PatientListTamil />} />

        {/* 🩺 OP Chit */}
        <Route path="/opchit/:id" element={<OpChitTamil />} />

        {/* 📋 Camp Report */}
        <Route path="/campreport" element={<CampReport />} />
      </Routes>
    </Router>
  );
}

export default App;
