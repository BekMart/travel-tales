import React, { useRef, useState } from "react";

import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";

import Upload from "../../../assets/upload.png";

import styles from "../../../styles/PostCreateEditForm.module.css";
import appStyles from "../../../App.module.css";
import btnStyles from "../../../styles/Button.module.css";
import Asset from "../../Asset";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../../api/axios";

function PostCreateForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    location: "",
    content: "",
    image: "",
  });

  const { title, location, content, image } = postData;

  const imageInput = useRef(null)
  const history = useHistory()

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
    e.preventDefault()
    const formData = new FormData();

    formData.append('title', title)
    formData.append('location', location)
    formData.append('content', content)
    formData.append('image', imageInput.current.files[0])

    try {
        const {data} = await axiosReq.post('posts/', formData);
        history.push(`/posts/${data.id}`)
    } catch (err) {
        console.log(err)
        if (err.response?.status !== 401){
            setErrors(err.response?.data)
        }
    }
  }

  const textFields = (
    <div className="text-center">
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

      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          className={styles.Input}
          type="text"
          name="location"
          value={location}
          onChange={handleChange}
        />
      </Form.Group>

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

      <Button
        className={`${btnStyles.Button} ${btnStyles.Cancel}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Create}`}
        type="submit"
      >
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Create} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
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

export default PostCreateForm;
