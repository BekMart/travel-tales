import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axios";
import styles from "../../styles/EditUsernamePasswordForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

// Form for changing the password of the currently authenticated user
const UserPasswordForm = () => {
  // Form field state
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  // Deconstruct userData
  const { new_password1, new_password2 } = userData;

  // Get current user from context
  const currentUser = useCurrentUser();
  // Get profile ID from URL
  const { id } = useParams();

  // For navigation
  const history = useHistory();
  // Field-specific validation errors
  const [errors, setErrors] = useState({});

  // Handle input field changes
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  // Redirect user home if they are not the owner of the profile
  useEffect(() => {
    if (!currentUser) return;
    if (currentUser?.profile_id?.toString() !== id) {
      history.push("/");
    }
  }, [currentUser, history, id]);

  // Submit new password to API
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      // User feedback
      toast.success("Password updated successfully!");
      // Return to previous page
      history.goBack();
    } catch (err) {
      // User feedback
      toast.error("Failed to update password.");
      // Set validation errors for display
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit}>
            {/* New password field */}
            <Form.Group>
              <Form.Label className={styles.Label}>New password</Form.Label>
              <Form.Control
                className={styles.Input}
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>
            {/* Password field validation errors */}
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            {/* Confirm new password field */}
            <Form.Group>
              <Form.Label className={styles.Label}>Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </Form.Group>
            {/* Password field validation errors */}
            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            {/* Cancel button */}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Cancel}`}
              onClick={() => history.goBack()}
            >
              cancel
            </Button>

            {/* Save button */}
            <Button
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Save}`}
            >
              save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UserPasswordForm;
