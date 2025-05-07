import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { capitalizeWords } from "../../utils/utils";
import { axiosReq } from "../../api/axios";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

// Form to edit an existing post if the user is the owner
function PostEditForm() {
  // Validation error state
  const [error, setError] = useState({});

  // Form state to hold current post data
  const [postData, setPostData] = useState({
    title: "",
    location_input: "",
    content: "",
    image: "",
  });

  // Deconstruct post data fields
  const { title, location_input, content, image } = postData;

  // Ref for image file input
  const imageInput = useRef(null);
  // For programmatic navigation
  const history = useHistory();
  // Extract post ID from URL params
  const { id } = useParams();

  // Fetch post details on component mount
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, location, content, image, is_owner } = data;

        // If the user owns the post, populate the form with its data
        is_owner
          ? setPostData({
              title: capitalizeWords(title),
              location_input: capitalizeWords(location),
              content,
              image,
            })
          : // Redirect home if user does not own the post
            history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

  // Handle input changes
  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image selection and preview
  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // Submit updated post data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form fields
    formData.append("title", title);
    formData.append("location_input", location_input);
    formData.append("content", content);

    // Conditionally include a new image
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      // If updated sucessfully, update post data, navigate to post, provide feedback
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
      toast.success("Post updated successfully!");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      // Only show validation errors if the error isn't due to unauthorized access
      if (err.response?.status !== 401) {
        setError(err.response?.data);
      }
    }
  };

  // Form input fields
  const textFields = (
    <div className="text-center">
      {/* Post Title */}
      <Form.Group>
        <Form.Label htmlFor="title" className={styles.Label}>
          Title
        </Form.Label>
        <Form.Control
          id="title"
          className={styles.Input}
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Title field related errors */}
      {error.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Post Location */}
      <Form.Group>
        <Form.Label htmlFor="location" className={styles.Label}>
          Location
        </Form.Label>
        <Form.Control
          id="location"
          className={styles.Input}
          type="text"
          name="location_input"
          value={location_input}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Location field related errors */}
      {error.location?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Post Content */}
      <Form.Group>
        <Form.Label htmlFor="content" className={styles.Label}>
          Content
        </Form.Label>
        <Form.Control
          id="content"
          className={styles.Input}
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Content field related errors */}
      {error.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Cancel Button */}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Cancel}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>

      {/* Save Button */}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Create}`}
        type="submit"
      >
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          {/* Heading */}
          <h1 className={styles.Heading}>Ooop, let's fix that..</h1>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {/* Show current image  */}
              <figure>
                <Image
                  className={styles.Image}
                  src={image}
                  alt="Current post image"
                  rounded
                />
              </figure>
              <div>
                {/* Change image button */}
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Create} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              {/* Hidden file input for new image */}
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>

            {/* Text fields below image on smaller screens */}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>

        {/* Sidebar form on medium+ screens */}
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;
