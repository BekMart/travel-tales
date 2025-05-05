import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";
import { axiosReq } from "../../api/axios";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import Post from "../posts/Post";
import NoResults from "../../assets/no-results.png";
import PopularProfiles from "./PopularProfiles";
import PopularLocations from "../locations/PopularLocations";
import PopularPosts from "../posts/PopularPosts";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

// Page to display a user's public profile, their posts, and follow functionality
function ProfilePage() {
  // Loading state
  const [hasLoaded, setHasLoaded] = useState(false);
  // Posts made by this profile owner
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  // Get the current authenticated user
  const currentUser = useCurrentUser();
  // Ger profile ID from URL
  const { id } = useParams();

  // Context functions to manage profile data and follow actions
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;

  // Check if this is the user's own profile
  const is_owner = currentUser?.username === profile?.owner;

  // Fetch profile info and associated posts on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        // Update context and local state with fetched data
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  // Section to display profile overview and follow button
  const mainProfile = (
    <>
      {/* Dropdown for editing own profile */}
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}

      <Row noGutters className="px-3 text-center">
        {/* Profile Image */}
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
            alt={`${profile?.owner}'s profile picture`}
          />
        </Col>

        {/* Username */}
        <Col lg={6}>
          <h3 className="m-2">
            <strong>{profile?.owner}</strong>
          </h3>

          {/* Profile stats */}
          <Row className="justify-content-center no-gutters">
            {/* Posts count */}
            <Col xs={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div className={styles.Stats}>posts</div>
            </Col>
            {/* Followers count */}
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div className={styles.Stats}>followers</div>
            </Col>
            {/* Following count */}
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div className={styles.Stats}>following</div>
            </Col>
          </Row>
        </Col>
        {/* Follow/Unfollow button */}
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              // Unfollow button displayed if logged in/not the owner/already has a following id associated with profile
              <Button
                className={`${btnStyles.Button} ${btnStyles.Follow} ${btnStyles.Larger}`}
                onClick={() => handleUnfollow(profile)}
              >
                Unfollow
              </Button>
            ) : (
              // Follow button displayed if logged in/not the owner/doesn't already follow profile
              <Button
                className={`${btnStyles.Button} ${btnStyles.Follow} ${btnStyles.Larger}`}
                onClick={() => handleFollow(profile)}
              >
                Follow
              </Button>
            ))}
        </Col>
      </Row>

      {/* Profile bio content */}
      <hr />
      {profile?.content && <Col className="p-3">{profile.content}</Col>}
    </>
  );

  // Section to display the user's posts using InfiniteScroll
  const mainProfilePosts = (
    <>
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        // If no results found then default image/message displayed
        <Container className={appStyles.Content}>
          <Asset
            src={NoResults}
            message={`No results found, ${profile?.owner} hasn't posted yet.`}
          />
        </Container>
      )}
    </>
  );

  return (
    <Row>
      {/* Main profile section */}
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            // Show loading spinner until data is loaded
            <Asset spinner />
          )}
        </Container>
      </Col>

      {/* Sidebar with popular content – visible only on large screens */}
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
        <PopularLocations />
        <PopularPosts />
      </Col>
    </Row>
  );
}

export default ProfilePage;
