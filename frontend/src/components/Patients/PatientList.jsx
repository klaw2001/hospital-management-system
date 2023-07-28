import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
const PatientList = () => {
  const [patients, setPatients] = useState([]);
  function getPatients() {
    axios
      .get("http://localhost:8000/patients/get-patients")
      .then((res) => {
        setPatients(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getPatients();
  }, []);

  const onDeleteHandler = (elemid) => {
    axios
      .delete(`http://localhost:8000/patients/delete-patient/${elemid}`)
      .then((res) => {
        getPatients()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container>
        <button className="btn btn-primary my-3">
          <Link to={"/add-patient"} className="text-light text-decoration-none">
            Add User
          </Link>
        </button>
        <h1 className="text-start mb-3">Patients:</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((elem, ind) => {
                console.log(elem)
              return (
                <tr key={elem._id}>
                  <td>{++ind}</td>
                  <td>
                    {elem?.firstname} {elem?.lastname}
                  </td>
                  <td>{new Date(elem?.dateofbirth).toLocaleDateString()}</td>
                  <td>{elem?.gender}</td>
                  <td>{elem?.email}</td>
                  <td>{elem?.phone}</td>
                  <td>
                    <button>
                        <Link className="text-decoration-none text-dark" to={'/edit-user/'+elem?._id}>Edit</Link>
                    </button>
                    <button onClick={()=>onDeleteHandler(elem._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
    </>
  );
};

export default PatientList;
