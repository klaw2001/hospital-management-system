import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

const EditRecords = () => {
    const {recordid} = useParams()
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
const [record,setRecord] = useState({})

useEffect(()=>{
    axios.get(`http://localhost:8000/medical-records/get-single-record/${recordid}`)
    .then((res)=>{
        setRecord(res.data.data)
    })
    .catch((err) => {
        console.log(err);
      });
},[recordid])

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

  function getDoctors() {
    axios
      .get("http://localhost:8000/doctors/get-doctors")
      .then((res) => {
        setDoctors(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getPatients();
  }, []);

  useEffect(() => {
    getDoctors();
  }, []);
  return (
    <div className="add-user">
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="m-4 p-4">
              <h3>Edit Medical Record</h3>
              <Formik
              enableReinitialize={true}
                initialValues={{
                  patientID: record?.patientID,
                  doctorID: record?.doctorID,
                  diagnosis: record?.diagnosis,
                  prescription: record?.prescription,
                  labtestresults: record?.labtestresults,
                  treatmenthistory: record?.treatmenthistory,
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.patientID) {
                    errors.patient = "patient is Required";
                  }
                  if (!values.doctorID) {
                    errors.doctor = "doctor is Required";
                  }
                  if (!values.diagnosis) {
                    errors.diagnosis = "Date of Birth is Required";
                  }
                  if (!values.prescription) {
                    errors.prescription = "prescription is Required";
                  }
                  if (!values.labtestresults) {
                    errors.labtestresults = "lab test results is Required";
                  }
                  if (!values.treatmenthistory) {
                    errors.treatmenthistory = "treatment history is Required";
                  }

                  return errors;
                }}
                onSubmit={ (values, { setSubmitting }) => {
                  
                  setTimeout(() => {
                    // const medicalRecordData = {
                    //       patientID: values.patientID,
                    //       doctorID: values.doctorID,
                    //       diagnosis: values.diagnosis,
                    //       prescription: values.prescription,
                    //       labtestresults: values.labtestresults,
                    //       treatmenthistory: values.treatmenthistory,
                    //     };
                    // alert(JSON.stringify(values, null, 2));
                    // console.log(medicalRecordData)
                    axios
                      .put(
                        "http://localhost:8000/medical-records/update-record/" + recordid,
                        values
                      )
                      .then((res) => {
                        if (res.status == 200) {
                          navigate("/medical-records");
                        }
                      })
                      .catch((err) => console.log(err));
                  setSubmitting(false);
                  }, 400);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <select
                      name="patientID"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.patientID}
                    >
                      <option value="">Select a Patient</option>
                      {patients.map((patient) => (
                        <option key={patient._id} value={patient._id}>
                          {`${patient.firstname} ${patient.lastname}`}
                        </option>
                      ))}
                    </select>
                    <select
                      name="doctorID"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.doctorID}
                    >
                      <option value="">Select a Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor?._id} value={doctor?._id}>
                          {`${doctor?.firstname} ${doctor?.lastname}`}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="diagnosis"
                      placeholder="Diagnosis"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.diagnosis}
                    />
                    <input
                      type="text"
                      name="prescription"
                      placeholder="Prescription"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.prescription}
                    />

                    <input
                      type="text"
                      name="labtestresults"
                      placeholder="Lab Test Results"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.labtestresults}
                    />

                    <input
                      type="text"
                      name="treatmenthistory"
                      placeholder="Treatment history"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.treatmenthistory}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary mt-2"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </form>
                )}
              </Formik>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditRecords;
