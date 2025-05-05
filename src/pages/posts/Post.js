import React from "react";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import useWindowWidth from "../../hooks/useWindowWidth";
import { axiosReq, axiosRes } from "../../api/axios";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/Post.module.css";

// Create component for an individual post
const Post = (props) => {
  // Destructure post-related props passed from parent component
  const {
    id,
    owner,
    profile_id,
    profile_image,
    title,
    updated_on,
    image,
    location_details,
    content,
    likes_count,
    like_id,
    comments_count,
    postPage,
    setPosts,
  } = props;

  // Get the currently logged-in user
  const currentUser = useCurrentUser();
  // Check if the current user owns the post
  const is_owner = currentUser?.username === owner;
  // React Router history for navigation
  const history = useHistory();

  // Call hook to amend date styling on smaller screens
  const width = useWindowWidth();
  const isSmallScreen = width <= 500;

  // Format date differently on smaller screens to save space
  const formattedDate = new Date(updated_on).toLocaleDateString(
    "en-GB",
    isSmallScreen
      ? { day: "2-digit", month: "2-digit", year: "2-digit" }
      : { day: "2-digit", month: "short", year: "numeric" }
  );

  // Navigate to the post edit form
  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  // Delete the post and redirect back
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
      toast.success("Post deleted successfully!");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Like the post and update the local state
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      toast.success("Post liked successfully!");
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Unlike the post and update the local state
  const handleUnlike = async () => {
    try {
      await axiosReq.delete(`/likes/${like_id}/`);
      toast.success("Post unliked successfully!");
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Card className={styles.Post}>
      {/* Post header */}
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          {/* Avatar and username - link to profile */}
          <Link
            to={`/profiles/${profile_id}`}
            className={styles.ProfileWrapper}
          >
            <div className={styles.ProfileInfo}>
              <Avatar
                src={profile_image}
                alt={`${owner}'s profile picture`}
                height={55}
              />
              <strong className={styles.Name}>{owner}</strong>
            </div>
          </Link>

          {/* Display location if available - link to location category */}
          {location_details?.slug ? (
            <Link to={`/locations/${location_details.slug}`}>
              <span className={styles.Location}>{location_details.name}</span>
            </Link>
          ) : (
            <span>Location unknown</span>
          )}

          {/* Timestamp */}
          <div className="d-flex align-items-center">
            <span className={`${styles.Date} "mx-3"`}>{formattedDate}</span>
            {/* Dropdown for post owner to edit/delete posts */}
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>

      {/* Post image links to post detail view */}
      <Link to={`/posts/${id}`} className={styles.ImageLink}>
        <Card.Img src={image} alt={title} />
      </Link>

      {/* Post body */}
      <Card.Body>
        {/* Title */}
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {/* Content */}
        {content && <Card.Text>{content}</Card.Text>}

        {/* Handles likes/unlikes with relevant user feedback */}
        <div>
          {is_owner ? (
            // User cannot like post if they created it
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            // If user has already liked post, handle unlike once clicked
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            // If user is authenticated and not previously liked post, handle like once clicked
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            // Must be logged in to like/unlike a post
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className={"far fa-heart"} />
            </OverlayTrigger>
          )}
          {/* Like count */}
          {likes_count}

          {/* Link to comments on the post */}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" aria-hidden="true" />
            <span className={styles.srOnly}>
              View {comments_count} comment{comments_count !== 1 && "s"} for
              post
            </span>
          </Link>
          {/* Comments Count */}
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
