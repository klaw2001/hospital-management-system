import React from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

const AddRecords = () => {
  const navigate = useNavigate();

  return (
    <div className="add-user">
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="m-4 p-4">
              <h3>Add Medical Record</h3>
              <Formik
                initialValues={{
                  patientID: "",
                  doctor: "",
                  diagnosis: "",
                  prescription: "",
                  labtestresults: "",
                  treatmenthistory: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.patient) {
                    errors.patient = "patient is Required";
                  }
                  if (!values.doctor) {
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
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const patientData = await axios.post(
                      "http://localhost:8000/patients/add-patient",
                      {
                        firstname: values.patient.split(" ")[0],
                        lastname: values.patient.split(" ")[1],
                      }
                    );

                    const doctorData = await axios.post(
                      "http://localhost:8000/doctors/add-doctor",
                      {
                        firstname: values.doctor.split(" ")[0],
                        lastname: values.doctor.split(" ")[1],
                      }
                    );

                    const medicalRecordData = {
                      patientID: patientData.data._id,
                      doctorID: doctorData.data._id,
                      diagnosis: values.diagnosis,
                      prescription: values.prescription,
                      labtestresults: values.labtestresults,
                      treatmenthistory: values.treatmenthistory,
                    };

                    const response = await axios.post(
                      "http://localhost:8000/medical-records/add-record",
                      medicalRecordData
                    );

                    if (response.status === 201) {
                      navigate("/medical-records");
                    }
                  } catch (error) {
                    console.log(error);
                  }
                    // setTimeout(() => {
                    //   // alert(JSON.stringify(values, null, 2));
                    //   axios
                    //     .post(
                    //       "http://localhost:8000/medical-records/add-record",
                    //       values
                    //     )
                    //     .then((res) => {
                    //       if (res.status == 201) {
                    //         navigate("/medical-records");
                    //       }
                    //     })
                    //     .catch((err) => console.log(err));
                    //   setSubmitting(false);
                    // }, 400);
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
                    <input
                      type="text"
                      name="patient"
                      placeholder="Patient Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.patient}
                    />
                    <input
                      type="text"
                      name="doctor"
                      placeholder="Doctor"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.doctor}
                    />
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

export default AddRecords;
