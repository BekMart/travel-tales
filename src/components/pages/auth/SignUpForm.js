import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/SignInUpForm.module.css";
import btnStyles from "../../../styles/Button.module.css"
import appStyles from "../../../App.module.css";


import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form>
            <Form.Group controlId="formBasicId">
              <Form.Label className="d-none">Name</Form.Label>
              <Row>
                <Col>
                  <Form.Control className={styles.Input} placeholder="First name" />
                </Col>
                <Col>
                  <Form.Control className={styles.Input} placeholder="Last name" />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control className={styles.Input} type="text" placeholder="Username" />
            </Form.Group>

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control className={styles.Input} type="password" placeholder="Password" name="password1"/>
            </Form.Group>
            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control className={styles.Input} type="password" placeholder="Confirm Password" name="passwrod2" />
            </Form.Group>
            
            <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.SignUp}`} variant="secondary" type="submit">
              Sign up
            </Button>
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/login">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>

      <Col
        md={6}
        className={`my-auto d-none d-md-block p-4 ${styles.SignUpCol}`}
      >
        <Image
          className={styles.SignUpImage}
          src={
            "https://res.cloudinary.com/dvgobcuck/image/upload/v1744541805/pexels-ajay-donga-1113836-2174656_rn9utz.jpg"
          }
          alt="Sign Up image of a couple on a yellow motorbike riding on a road with tropical palm trees on either side of the road"
          fluid
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
