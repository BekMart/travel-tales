import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
import { axiosReq } from "../../api/axios";
import Post from "./Post";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import PopularProfiles from "../profiles/PopularProfiles";
import PopularLocations from "../locations/PopularLocations";
import PopularPosts from "./PopularPosts";
import appStyles from "../../App.module.css";

// Component to display a list of posts with optional filtering and infinite scrolling
function PostsPage({ message, filter = "" }) {
  // Store fetched posts
  const [posts, setPosts] = useState({ results: [] });
  // Track loading state
  const [hasLoaded, setHasLoaded] = useState(false);
  // Detect route changes
  const { pathname } = useLocation();
  // Get currently logged-in user
  const currentUser = useCurrentUser();

  // Fetch posts when the filter or pathname changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts with optional filter
        const { data } = await axiosReq.get(`/posts/?${filter}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    // Reset loading state before new fetch
    setHasLoaded(false);
    // Trigger fetch
    fetchPosts();
  }, [filter, pathname, currentUser]);

  return (
    <Row className="h-100">
      {/* Main post feed area */}
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <h2 className={appStyles.PageHeading}>
          {/* Personalized or generic greeting based on logged in status */}
          {currentUser
            ? `Hey there, ${currentUser.username}!`
            : "Welcome to Travel Tales!"}
        </h2>
        {/* Show spinner or posts based on loading state */}
        {hasLoaded ? (
          <>
            {/* Render posts if found */}
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              // No posts found – display message and fallback image
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          // Initial loading spinner while fetching posts
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>

      {/* Sidebar with popular content – visible only on large screens */}
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
        <PopularLocations />
        <PopularPosts />
      </Col>
    </Row>
  );
}

export default PostsPage;
