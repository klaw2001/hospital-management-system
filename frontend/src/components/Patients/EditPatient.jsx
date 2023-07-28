import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

const EditPatient = () => {
  const { patientid } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/patients/get-single-patient/${patientid}`)
      .then((res) => {
        setPatient(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [patientid]);

  return (
    <div className="add-user">
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="m-4 p-4">
              <h3>Edit User</h3>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  firstname: patient?.firstname,
                  lastname: patient?.lastname,
                  dateofbirth: patient?.dateofbirth,
                  gender: patient?.gender,
                  email: patient?.email,
                  phone: patient?.phone,
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.firstname) {
                    errors.firstname = "Firstname is Required";
                  }
                  if (!values.lastname) {
                    errors.lastname = "Lastname is Required";
                  }
                  if (!values.dateofbirth) {
                    errors.dateofbirth = "Date of Birth is Required";
                  }
                  if (!values.gender) {
                    errors.gender = "Gender is Required";
                  }
                  if (!values.email) {
                    errors.email = "Email is Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  if (!values.phone) {
                    errors.phone = "Phone Number is Required";
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2));
                    axios
                      .put(
                        "http://localhost:8000/patients/update-patient/" +
                          patientid,
                        values
                      )
                      .then((res) => {
                        if (res.status == 200) {
                          navigate("/patients");
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
                    <input
                      type="text"
                      name="firstname"
                      placeholder="firstname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.firstname}
                    />
                    <input
                      type="text"
                      name="lastname"
                      placeholder="lastname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.lastname}
                    />
                    <input
                      type="date"
                      name="dateofbirth"
                      placeholder="dateofbirth"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.dateofbirth}
                    />
                    <select
                      name="gender"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.gender}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.email}
                    />
                    {errors.email && touched.email && errors.email}

                    <input
                      type="text"
                      name="phone"
                      placeholder="phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.phone}
                    />
                    {errors.password && touched.password && errors.password}
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

export default EditPatient;
