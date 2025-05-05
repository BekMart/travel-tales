import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axios";
import CommentEditForm from "./CommentEditForm";
import styles from "../../styles/Comment.module.css";

// Comment component ti display individual comment
const Comment = (props) => {
  // Destructure props received from the parent component
  const {
    id,
    profile_id,
    profile_image,
    owner,
    updated_on,
    content,
    setPost,
    setComments,
  } = props;

  // Get the current logged-in user
  const currentUser = useCurrentUser();
  // Check if the current user owns this comment
  const is_owner = currentUser?.username === owner;
  // Toggle for showing/hiding the edit form
  const [showEditForm, setShowEditForm] = useState(false);

  // Handle deletion of a comment
  const handleDelete = async () => {
    try {
      // API call to delete the comment
      await axiosRes.delete(`/comments/${id}/`);
      toast.success("Comment deleted successfully!");
      // Update comment count on the post after deletion
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));
      // Remove the deleted comment from the comments list
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <hr />
      <Media>
        {/* User avatar linking to their profile */}
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} alt={`${owner}'s profile picture`} />
        </Link>

        {/* Display comment owner's username and when comment was submitted */}
        <Media.Body className={`ms-2 ${styles.Body}`}>
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_on}</span>

          {/* Show edit form if toggled, otherwise show comment content */}
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>

        {/* Show dropdown menu for edit/delete if user owns the comment and is not editing */}
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Comment;
