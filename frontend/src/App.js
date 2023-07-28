import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';

import AppBar from './components/AppBarComp/AppBar';
import PatientList from './components/Patients/PatientList';
import DefaultComp from './components/Default/DefaultComp';
import AddPatient from './components/Patients/AddPatient';
import EditPatient from './components/Patients/EditPatient';
function App() {
  return (
    <div className="App">
      <Router>
        <AppBar/>
        <Routes>
          <Route path='/' element={<DefaultComp/>} />
          <Route path='/patients' element={<PatientList/>} />
          <Route path='/add-patient' element={<AddPatient/>} />
          <Route path='/edit-user/:patientid' element={<EditPatient/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
