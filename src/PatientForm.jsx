import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientForm() {
  const nav = useNavigate();
  const [f, setF] = useState({
    name: "", age: "", gender: "ஆண்", address: "", phone: ""
  });

  const save = (e) => {
    e.preventDefault();
    nav("/opchit");
  };

  return (
    <form onSubmit={save} className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-lg rounded grid gap-3">
      <h1 className="text-xl font-semibold text-sky-700 text-center mb-3">நோயாளர் பதிவு படிவம்</h1>
      <input className="border p-2" placeholder="பெயர்" onChange={e=>setF({...f,name:e.target.value})}/>
      <div className="grid grid-cols-2 gap-3">
        <input className="border p-2" placeholder="வயது" onChange={e=>setF({...f,age:e.target.value})}/>
        <select className="border p-2" onChange={e=>setF({...f,gender:e.target.value})}>
          <option>ஆண்</option><option>பெண்</option><option>மற்றவை</option>
        </select>
      </div>
      <input className="border p-2" placeholder="முகவரி" onChange={e=>setF({...f,address:e.target.value})}/>
      <input className="border p-2" placeholder="தொலைபேசி" onChange={e=>setF({...f,phone:e.target.value})}/>
      <button className="bg-sky-600 text-white rounded p-2 hover:bg-sky-700">
        Save & Print OP Chit
      </button>
    </form>
  );
}
