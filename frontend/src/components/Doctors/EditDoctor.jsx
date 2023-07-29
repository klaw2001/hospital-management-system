import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

const EditDoctor = () => {
    const { doctorid } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({});
  
    useEffect(() => {
      axios
        .get(`http://localhost:8000/doctors/get-single-doctor/${doctorid}`)
        .then((res) => {
          setDoctor(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [doctorid]);
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
                  firstname: doctor?.firstname,
                  lastname: doctor?.lastname,
                  specialization: doctor?.specialization,
                  
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
                      .put(
                        "http://localhost:8000/doctors/update-doctor/" + doctorid,
                        values
                      )
                      .then((res) => {
                        if (res.status == 200) {
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

export default EditDoctor