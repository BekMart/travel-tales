import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import api from "../../api/axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    // firstName: "",
    // lastName: "",
    username: "",
    password1: "",
    password2: "",
  });

  //   const { firstName, lastName, username, password1, password2 } = signUpData;
  const { username, password1, password2 } = signUpData;

  const [error, setError] = useState({});

  const history = useHistory();

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/dj-rest-auth/registration/", signUpData);
      history.push("/login");
    } catch (error) {
      setError(error.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>Sign up</h1>

          <Form onSubmit={handleSubmit}>
            {/* First and Last Name */}
            {/* <Row>
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="lasstName">
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row> */}

            {/* Username */}
            <Form.Group controlId="username">
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {error.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {/* Password */}
            <Form.Group controlId="password1">
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {error.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {/* Confirm Password */}
            <Form.Group controlId="password2">
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {error.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.SignUp}`}
              type="submit"
            >
              Sign up
            </Button>
            {error.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/login">
            Already have an account? <span>Log in</span>
          </Link>
        </Container>
      </Col>

      <Col
        md={6}
        className={`my-auto d-none d-md-block p-4 ${styles.SignUpCol}`}
      >
        <Image
          className={styles.SignUpImage}
          src="https://res.cloudinary.com/dvgobcuck/image/upload/v1744541805/pexels-ajay-donga-1113836-2174656_rn9utz.jpg"
          alt="Sign Up image of a couple on a yellow motorbike riding on a road with tropical palm trees on either side of the road"
          fluid
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
