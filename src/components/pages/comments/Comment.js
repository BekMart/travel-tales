import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../../styles/Comment.module.css";
import Avatar from "../../Avatar";

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_on, content } = props;

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className={`ms-2 ${styles.Body}`} >
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_on}</span>
          <p>{content}</p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;
