import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosRes } from "../../api/axios";
import Avatar from "../../components/Avatar";
import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// Component to allow authenticated users to create comments on posts
function CommentCreateForm(props) {
  // Destructure props passed from the parent component
  const { post, setPost, setComments, profileImage, profile_id } = props;
  // Local state for the content of the new comment
  const [content, setContent] = useState("");

  // Handle input change in the comment textarea
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Handle form submission to create a new comment
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send POST request to create comment
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      // Prepend new comment to the existing list
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      // Increment the comment count on the associated post
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      // Clear the textarea and show success message
      setContent("");
      toast.success("Thanks for the comment!");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group controlId="comment-input">
        <Form.Label
          htmlFor="comment-input"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          Edit your comment
        </Form.Label>

        <InputGroup>
          {/* Link avatar to the user's profile */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar
              src={profileImage}
              alt={`${profileImage.owner}'s profile picture`}
            />
          </Link>

          {/* Comment input field */}
          <Form.Control
            id="comment-input"
            className={styles.Form}
            placeholder="Write a comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>

      {/* Submit button; disabled if the input is empty */}
      <button
        className={`${btnStyles.Button} ${btnStyles.Post} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentCreateForm;
