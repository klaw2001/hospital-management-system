import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import SpinnerLoadComp from "../SpinnerComp/SpinnerLoadComp";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  function getDoctors() {
    axios
      .get("http://localhost:8000/doctors/get-doctors")
      .then((res) => {
        setDoctors(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getDoctors();
  }, []);

  const onDeleteHandler = (elemid) => {
    axios
      .delete(`http://localhost:8000/doctors/delete-doctor/${elemid}`)
      .then((res) => {
        getDoctors();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {doctors.length > 0 ? (
        <Container>
          <button className="btn btn-primary my-3">
            <Link
              to={"/add-doctor"}
              className="text-light text-decoration-none"
            >
              Add Doctor
            </Link>
          </button>
          <h1 className="text-start mb-3">Doctors:</h1>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((elem, ind) => {
                return (
                  <tr key={elem._id}>
                    <td>{++ind}</td>
                    <td>
                      {elem?.firstname} {elem?.lastname}
                    </td>
                    <td>{elem?.specialization}</td>
                    <td>
                      <button>
                        <Link
                          className="text-decoration-none text-dark"
                          to={"/edit-doctor/" + elem?._id}
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
        <SpinnerLoadComp />
      )}
    </>
  );
};

export default DoctorsList;
