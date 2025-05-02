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
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { toast } from "react-toastify";
import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;
  const [error, setError] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      toast.success("Welcome back!");
      history.goBack();
    } catch (err) {
      setError(err.response?.data);
    }
  };

  return (
    <>
    <h1 className={styles.Heading}>Welcome Back!</h1>
    <Row className={`${styles.Row} no-gutters`}>
      <Col xs={12} md={6} className="mt-3 py-2 p-md-2">
        <Container className={`${appStyles.Content} p-2 p-md-4`}>
          <h2 className={styles.Header}>Log in</h2>
          <Form onSubmit={handleSubmit}>
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
            {error.password?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {error.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.SignIn}`}
              type="submit"
            >
              Log in
            </Button>
          </Form>
        </Container>

        <Container className={`mt-3 mb-5 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            <strong>Don't have an account? <span>Sign up now!</span></strong>
          </Link>
        </Container>
      </Col>

      <Col
        md={6}
        className={`mt-5 d-none d-md-block p-4 ${styles.SignInCol}`}
      >
        <Image
          className={styles.SignInImage}
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
