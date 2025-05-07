import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useRedirect } from "../../hooks/useRedirect";
import { capitalizeWords } from "../../utils/utils";
import { axiosReq } from "../../api/axios";
import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

// Create form to upload a post if user is authenticated
function PostCreateForm() {
  // Redirect unauthenticated users to login
  useRedirect("loggedOut");
  // Track validation errors from the backend
  const [error, setError] = useState({});

  // Form state to manage post fields
  const [postData, setPostData] = useState({
    title: "",
    location_input: "",
    content: "",
    image: "",
  });

  // Deconstruct postData
  const { title, location_input, content, image } = postData;

  // Ref for accessing the image input file
  const imageInput = useRef(null);
  // Used for navigation after form actions
  const history = useHistory();

  // Handle text input field changes
  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload and preview using FileReader
  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      // Revoke previous object URL to avoid memory leaks
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        // Generate preview URL
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // Handle form submission to create a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Prepare form data for multipart/form-data POST
    // Capitalise the title and location fields
    formData.append("title", capitalizeWords(title));
    formData.append("location_input", capitalizeWords(location_input));
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      // If post created successfully, update post data, navigate to post, provide feedback
      const { data } = await axiosReq.post("posts/", formData);
      history.push(`/posts/${data.id}`);
      toast.success("Post created successfully!");
    } catch (err) {
      console.log(err);
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
        <Form.Label htmlFor="title">Title</Form.Label>
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
        <Form.Label htmlFor="location_input">Location</Form.Label>
        <Form.Control
          id="location_input"
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
        <Form.Label htmlFor="content">Content</Form.Label>
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

      {/* Create Button */}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Create}`}
        type="submit"
      >
        create
      </Button>
    </div>
  );

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
            {/* Heading */}
            <h1 className={styles.Heading}>
              Where have <em>you</em> been?
            </h1>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              {/* Image upload and preview section */}
              <Form.Group className="text-center">
                {/* Display image preview if available */}
                {image ? (
                  <>
                    <figure>
                      <Image
                        className={styles.Image}
                        alt="Preview of uploaded post"
                        src={image}
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
                  </>
                ) : (
                  // Placeholder asset if no image uploaded
                  <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="image-upload"
                  >
                    <Asset
                      src={Upload}
                      message="Click or tap to upload an image"
                    />
                  </Form.Label>
                )}

                {/* Hidden file input for image */}
                <Form.File
                  id="image-upload"
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={imageInput}
                />
              </Form.Group>

              {/* Show text fields below image on smaller screens */}
              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>

          {/* Sidebar with text fields on medium+ screens */}
          <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
            <Container className={appStyles.Content}>{textFields}</Container>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default PostCreateForm;
