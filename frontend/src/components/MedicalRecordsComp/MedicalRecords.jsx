import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import SpinnerLoadComp from "../SpinnerComp/SpinnerLoadComp";
const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  function getRecords() {
    axios
      .get("http://localhost:8000/medical-records/get-records")
      .then((res) => {
        setRecords(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getRecords();
  }, []);

  const onDeleteHandler = (elemid) => {
    axios
      .delete(`http://localhost:8000/medical-records/delete-record/${elemid}`)
      .then((res) => {
        getRecords();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {records.length > 0 ? (
        <Container>
          <button className="btn btn-primary my-3">
            <Link
              to={"/add-record"}
              className="text-light text-decoration-none"
            >
              Add Record
            </Link>
          </button>
          <h1 className="text-start mb-3">Medical Records:</h1>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Patient Name</th>
                <th>Doctor Name</th>
                <th>Diagnosis</th>
                <th>Prescription</th>
                <th>Lab Test Results</th>
                <th>Treatment History</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((elem, ind) => {
                console.log(elem);
                return (
                  <tr key={elem._id}>
                    <td>{++ind}</td>
                    <td>
                      {elem?.patients.firstname} {elem?.patients.lastname} 
                    </td>
                    <td>
                      {elem?.doctors.firstname} {elem?.doctors.lastname} 
                    </td>
                    <td>{elem?.diagnosis}</td>
                    <td>{elem?.prescription}</td>
                    <td>{elem?.labtestresults}</td>
                    <td>{elem?.treatmenthistory}</td>
                    <td>
                      <button>
                        <Link
                          className="text-decoration-none text-dark"
                          to={"/edit-user/" + elem?._id}
                        >
                          Edit
                        </Link>
                      </button>
                      <button onClick={() => onDeleteHandler(elem._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Container>
      ) : (
        <SpinnerLoadComp/>
      )}
    </>
  );
};

export default MedicalRecords;
