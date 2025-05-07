import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useRedirect } from "../../hooks/useRedirect";
import api from "../../api/axios";
import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

// Create sign up form component for new users
const SignUpForm = () => {
  // Redirect authenticated users away from the sign-up page
  useRedirect("loggedIn");

  // Form input state
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  // Destructure fields from signUpData
  const { username, password1, password2 } = signUpData;

  // Validation or server error messages
  const [error, setError] = useState({});
  // React Router history for navigation
  const history = useHistory();

  // Handle input changes for form fields
  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send sign-up request to backend
      await api.post("/dj-rest-auth/registration/", signUpData);
      // Notify success and redirect to login page
      toast.success("Account created successfully! Please log in.");
      history.push("/login");
    } catch (error) {
      // Capture and display validation errors from API
      setError(error.response?.data);
    }
  };

  return (
    <>
      <h1 className={styles.Heading}>Come and join us!</h1>
      <Row className={styles.Row}>
        <Col className="mt-3 py-2 p-md-2" md={6}>
          <Container className={`${appStyles.Content} p-4`}>
            <h1 className={styles.Header}>Sign up</h1>

            {/* Signup Form */}
            <Form onSubmit={handleSubmit}>
              {/* Username field */}
              <Form.Group controlId="username">
                <Form.Label htmlFor="username" className="visually-hidden">
                  Username
                </Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Show username-related errors */}
              {error.username?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              {/* Password field */}
              <Form.Group controlId="password1">
                <Form.Label htmlFor="password1" className="visually-hidden">
                  Password
                </Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Password"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Show password-related errors */}
              {error.password1?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              {/* Confirm password field */}
              <Form.Group controlId="password2">
                <Form.Label htmlFor="password2" className="visually-hidden">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Show password-related errors */}
              {error.password2?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              {/* Submit button */}
              <Button
                className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.SignUp}`}
                type="submit"
              >
                Sign up
              </Button>

              {/* General form errors */}
              {error.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>

          {/* Link to login for existing users */}
          <Container className={`mt-3 mb-5 ${appStyles.Content}`}>
            <Link className={styles.Link} to="/login">
              <strong>
                Already have an account? <span>Log in</span>
              </strong>
            </Link>
          </Container>
        </Col>

        {/* Right column image for desktop view */}
        <Col md={6} className={`mt-5 d-none d-md-block p-4 ${styles.ImageCol}`}>
          <Image
            className={styles.Image}
            src="https://res.cloudinary.com/dvgobcuck/image/upload/v1744541805/pexels-ajay-donga-1113836-2174656_rn9utz.jpg"
            alt="Sign Up image of a couple on a yellow motorbike riding on a road with tropical palm trees on either side of the road"
            fluid
          />
        </Col>
      </Row>
    </>
  );
};

export default SignUpForm;
