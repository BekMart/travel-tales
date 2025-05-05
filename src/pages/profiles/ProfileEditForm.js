import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axios";
import styles from "../../styles/ProfileEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

// Form for editing a user's own profile, including image, name, and bio
const ProfileEditForm = () => {
  // Get currently logged-in user
  const currentUser = useCurrentUser();
  // Function to update user context
  const setCurrentUser = useSetCurrentUser();
  // Get profile ID from URL
  const { id } = useParams();
  // For navigation
  const history = useHistory();
  // Ref to track the file input
  const imageFile = useRef();

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
  });
  // Deconstruct profileData
  const { name, content, image } = profileData;

  // Backend validation errors
  const [errors, setErrors] = useState({});

  // Fetch profile details on mount if current user is the profile owner
  useEffect(() => {
    const handleMount = async () => {
      if (!currentUser) return;
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, image } = data;
          setProfileData({ name, content, image });
        } catch (err) {
          // Redirect home if fetch fails
          history.push("/");
        }
      } else {
        // Redirect home if user is not the owner
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  // Handle changes to text fields
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission to update the profile
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);

    // Include image file only if a new one was selected
    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      // Update current user's profile image in context
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      toast.success("Profile updated successfully!");
      history.goBack();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      setErrors(err.response?.data);
    }
  };

  // Reusable input fields
  const textFields = (
    <>
      {/* Bio textarea */}
      <Form.Group controlId="content">
        <Form.Label htmlFor="content" className={styles.Label}>
          Bio
        </Form.Label>
        <Form.Control
          as="textarea"
          value={content}
          onChange={handleChange}
          name="content"
          id="content"
          rows={8}
          className={`${styles.Input} "form-control"`}
          placeholder="Tell us about yourself"
        />
      </Form.Group>
      {/* Bio field validation errors */}
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
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
      <Button className={`${btnStyles.Button} ${btnStyles.Save}`} type="submit">
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        {/* Image upload column */}
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          {/* Heading */}
          <h1 className={styles.Heading}>Tell us about you!</h1>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group>
              {/* Display current profile image if available */}
              {image && (
                <figure>
                  <Image
                    className={styles.Image}
                    src={image}
                    alt="Your current profile picture"
                    fluid
                  />
                </figure>
              )}
              {/* Image validation errors */}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                {/* Change profile image button */}
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Update} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change profile image
                </Form.Label>
              </div>

              {/* Image input */}
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>

            {/* Text fields shown below image on small screens */}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>

        {/* Text fields sidebar (shown on larger screens) */}
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;
