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
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";
import api from "../../api/axios";
import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

// Create sign in form function
function SignInForm() {
  // Function to update the user context
  const setCurrentUser = useSetCurrentUser();
  // Redirect logged-in users away from this page
  useRedirect("loggedIn");

  // State to manage form input fields
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  // Store validation or server errors
  const [error, setError] = useState({});
  // React Router for navigating after login
  const history = useHistory();

  // Handle input field changes
  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request
      const { data } = await api.post("/dj-rest-auth/login/", signInData);
      // Set user context, store token timestamp, show toast, and navigate back
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      toast.success("Welcome back!");
      history.goBack();
    } catch (err) {
      // Capture and display any validation or auth errors
      setError(err.response?.data);
    }
  };

  return (
    <>
      <h1 className={styles.Heading}>Welcome Back!</h1>
      <Row className={styles.Row}>
        <Col xs={12} md={6} className="mt-3 py-2 p-md-2">
          <Container className={`${appStyles.Content} p-2 p-md-4`}>
            <h2 className={styles.Header}>Log in</h2>

            {/* Login form */}
            <Form onSubmit={handleSubmit}>
              {/* Username field */}
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
              {/* Show username-related errors */}
              {error.username?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              {/* Password field */}
              <Form.Group controlId="password">
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Show password-related errors */}
              {error.password?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              {/* Show general (non-field) errors */}
              {error.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                  {message}
                </Alert>
              ))}

              {/* Submit button */}
              <Button
                className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.SignIn}`}
                type="submit"
              >
                Log in
              </Button>
            </Form>
          </Container>

          {/* Sign up link */}
          <Container className={`mt-3 mb-5 ${appStyles.Content}`}>
            <Link className={styles.Link} to="/signup">
              <strong>
                Don't have an account? <span>Sign up now!</span>
              </strong>
            </Link>
          </Container>
        </Col>

        {/* Side image for larger screens */}
        <Col md={6} className={`mt-5 d-none d-md-block p-4 ${styles.ImageCol}`}>
          <Image
            className={styles.Image}
            src="https://res.cloudinary.com/dvgobcuck/image/upload/v1744541812/pexels-andreimike-1271619_aktwma.jpg"
            alt="Man standing atop grassy mountain range"
            fluid
          />
        </Col>
      </Row>
    </>
  );
}

export default SignInForm;
