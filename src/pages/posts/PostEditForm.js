import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Image,
  Alert,
} from "react-bootstrap";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axios";
import { toast } from "react-toastify";
import { capitalizeWords } from "../../utils/utils";

function PostEditForm() {
  const [error, setError] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    location_input: "",
    content: "",
    image: "",
  });

  const { title, location_input, content, image } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, location, content, image, is_owner } = data;

        is_owner
          ? setPostData({
              title: capitalizeWords(title),
              location_input: capitalizeWords(location),
              content,
              image,
            })
          : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("location_input", location_input);
    formData.append("content", content);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
      toast.success("Post updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
      if (err.response?.status !== 401) {
        setError(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      {/* Post Title */}
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          className={styles.Input}
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {error.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Post Location */}
      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          className={styles.Input}
          type="text"
          name="location_input"
          value={location_input}
          onChange={handleChange}
        />
      </Form.Group>
      {error.location?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Post Content */}
      <Form.Group controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          className={styles.Input}
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
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
          <h1 className={styles.Heading}>Ooop, let's fix that..</h1>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {/* Image  */}
              <figure>
                <Image className={appStyles.Image} src={image} alt="Current post image" rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Create} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>

        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;
