import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import Avatar from "../../components/Avatar";
import styles from "../../styles/ProfileEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// Component to display a user's profile summary with follow/unfollow functionality
const Profile = (props) => {
  // Props include profile data, layout mode, and avatar size
  const { profile, mobile, imageSize = 55 } = props;
  // Destructure profile fields
  const { id, following_id, image, owner } = profile;

  // Get the currently logged-in user
  const currentUser = useCurrentUser();
  // Determine if the profile belongs to the logged-in user
  const is_owner = currentUser?.username === owner;

  // Get follow/unfollow handlers from context
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      {/* Profile image and username link to full profile */}
      <Link
        to={`/profiles/${id}`}
        className={`d-flex align-items-center text-decoration-none ${
          mobile && "flex-column text-center"
        }`}
      >
        {/* Profile avatar */}
        <Avatar
          src={image}
          alt={`${owner}'s profile picture`}
          height={imageSize}
        />
        {/* Username */}
        <div className={`mx-2 ${styles.WordBreak}`}>
          <strong>{owner}</strong>
        </div>
      </Link>

      {/* Follow/unfollow button if logged in and not on own profile */}
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {currentUser &&
          !is_owner &&
          (following_id ? (
            // Unfollow button
            <Button
              className={`${btnStyles.Button} ${btnStyles.Follow}`}
              onClick={() => handleUnfollow(profile)}
            >
              Unfollow
            </Button>
          ) : (
            //Follow button
            <Button
              className={`${btnStyles.Button} ${btnStyles.Follow}`}
              onClick={() => handleFollow(profile)}
            >
              Follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
