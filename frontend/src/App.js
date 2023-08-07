import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";

import AppBar from "./components/AppBarComp/AppBar";
import PatientList from "./components/Patients/PatientList";
import DefaultComp from "./components/Default/DefaultComp";
import AddPatient from "./components/Patients/AddPatient";
import EditPatient from "./components/Patients/EditPatient";
import { useState } from "react";
import LoginComp from "./components/Login/LoginComp";
import MedicalRecords from "./components/MedicalRecordsComp/MedicalRecords";
import AddRecords from "./components/MedicalRecordsComp/AddRecords";
import DoctorsList from "./components/Doctors/DoctorsList";
import AddDoctor from "./components/Doctors/AddDoctor";
import EditDoctor from "./components/Doctors/EditDoctor";
import EditRecords from "./components/MedicalRecordsComp/EditRecords";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div className="App ">
      <Router>
      {isLoggedIn ? (
          <React.Fragment>
            <AppBar onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<DefaultComp />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/add-patient" element={<AddPatient />} />
              <Route path="/edit-user/:patientid" element={<EditPatient />} />
              <Route path="/medical-records" element={<MedicalRecords />} />
              <Route path="/add-record" element={<AddRecords />} />
              <Route path="/edit-record/:recordid" element={<EditRecords />} />
              <Route path="/doctors" element={<DoctorsList />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/edit-doctor/:doctorid" element={<EditDoctor />} />
              {/* Add a catch-all route to handle undefined routes */}
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </React.Fragment>
        ) : (
          <LoginComp onLogin={handleLogin} />
        )}
      </Router>
    </div>
  );
}

export default App;
