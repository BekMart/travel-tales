import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { axiosRes } from "../../api/axios";
import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// Form to allow authenticated users to edit their own comments
function CommentEditForm(props) {
  // Destructure props from parent component
  const { id, content, setShowEditForm, setComments } = props;

  // Local state for the edited content (pre-filled with existing comment)
  const [formContent, setFormContent] = useState(content);

  // Handle textarea input change
  const handleChange = (e) => {
    setFormContent(e.target.value);
  };

  // Handle form submission to update the comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request with updated comment content
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      toast.success("Comment updated successfully!");
      // Update the comment in the local state
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      // Hide the edit form after successful submission
      setShowEditForm(false);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Comment area where user can edit comment text */}
      <Form.Group className="pr-1" controlId="edit-comment">
        <Form.Label
          htmlFor="edit-comment"
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

        <Form.Control
          id="edit-comment"
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>

      {/* Action buttons */}
      <div className="text-right">
        {/* Cancel button: closes the edit form */}
        <button
          className={`${btnStyles.Button} ${btnStyles.Cancel}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>

        {/* Save button: submits the updated content */}
        <button
          className={`${btnStyles.Button} ${btnStyles.Save}`}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
