import React from 'react'
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate } from 'react-router-dom'

const AddDoctor = () => {
    const navigate = useNavigate()
  return (
    <div className="add-user">
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="m-4 p-4">
              <h3>Add User</h3>
              <Formik
                initialValues={{
                  firstname: "",
                  lastname: "",
                  specialization: "",
                  
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.firstname) {
                    errors.firstname = "Firstname is Required";
                  }
                  if (!values.lastname) {
                    errors.lastname = "Lastname is Required";
                  }
                  if (!values.specialization) {
                    errors.dateofbirth = "Specialization is Required";
                  }
                  

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2));
                    axios
                      .post(
                        "http://localhost:8000/doctors/add-doctor",
                        values
                      )
                      .then((res) => {
                        if (res.status == 201) {
                          navigate("/doctors");
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
                      type="text"
                      name="specialization"
                      placeholder="specialization"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control mt-2"
                      value={values.specialization}
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
  )
}

export default AddDoctor