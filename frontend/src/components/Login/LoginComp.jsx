import React, { useContext } from "react";
import { Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { Card, Col, Container, Row } from "react-bootstrap";

const LoginComp = ({ onLogin }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row className="justify-content-center align-items-center login-row">
        <Col md={5}>
        <Card className="p-4">
        <h1>User Login</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Username is Required";
            }
            if (!values.password) {
              errors.password = "Password is Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              axios
                .post("http://localhost:8000/users/sign-in", values)
                .then((res) => {
                  console.log(res.data.data);
                  onLogin();
                  navigate("/");
                });
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
                name="username"
                className="form-control my-3"
                placeholder="Username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && touched.username && errors.username}
              <input
                type="password"
                name="password"
                className="form-control my-3"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button
                type="submit"
                className="btn btn-primary d-block m-auto mt-4"
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
  );
};

export default LoginComp;
