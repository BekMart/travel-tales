import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../../styles/Comment.module.css";
import Avatar from "../../Avatar";
import { useCurrentUser } from "../../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../MoreDropdown";
import { axiosRes } from "../../../api/axios";

const Comment = (props) => {
  const {
    id,
    profile_id,
    profile_image,
    owner,
    updated_on,
    content,
    postPage,
    setPost,
    setComments,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className={`ms-2 ${styles.Body}`}>
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_on}</span>
          <p>{content}</p>
        </Media.Body>
        {is_owner && (
          <MoreDropdown 
            handleEdit={() => {}} 
            handleDelete={handleDelete} 
          />
        )}
      </Media>
    </div>
  );
};

export default Comment;
