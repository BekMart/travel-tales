import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axios";
import styles from "../../styles/EditUsernamePasswordForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

// Form for editing the username of the currently authenticated user
const UsernameForm = () => {
  // Form field state
  const [username, setUsername] = useState("");

  // Get current user from context
  const currentUser = useCurrentUser();
  // Function to update user context
  const setCurrentUser = useSetCurrentUser();
  // Get profile ID from URL
  const { id } = useParams();

  // For navigation
  const history = useHistory();
  // Field-specific validation errors
  const [errors, setErrors] = useState({});

  // On mount, ensure the user is editing their own username
  useEffect(() => {
    if (!currentUser) return;
    // Pre-fill with current username
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      // Redirect if trying to access another user's form
      history.push("/");
    }
  }, [currentUser, history, id]);

  // Submit new username to API and update user context
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      // Update username in context
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      // User feedback
      toast.success("Username updated successfully!");
      // Return to previous page
      history.goBack();
    } catch (err) {
      toast.error("Failed to update username.");
      // Set field errors for display
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit} className="my-2">
            {/* Username input */}
            <Form.Group>
              <Form.Label htmlFor="username" className={styles.Label}>
                Change username
              </Form.Label>
              <Form.Control
                id="username"
                className={styles.Input}
                placeholder="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            {/* Display any username validation errors */}
            {errors?.username?.map((message, idx) => (
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
              className={`${btnStyles.Button} ${btnStyles.Save}`}
              type="submit"
            >
              save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UsernameForm;
