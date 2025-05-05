import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
import { axiosReq } from "../../api/axios";
import Post from "./Post";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import PopularProfiles from "../profiles/PopularProfiles";
import PopularLocations from "../locations/PopularLocations";
import PopularPosts from "./PopularPosts";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";

// Page to display an individual post along with its comments and a comment form
function PostPage() {
  // Extract post ID from URL
  const { id } = useParams();
  // State for the post data and post commments
  const [post, setPost] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });

  // Get the currently logged-in user and their profile image
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  // Fetch post and associated comments on mount
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        // Set results for rendering
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        // console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      {/* Single post and comment section */}
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Render the single post (from Post component) */}
        <Post {...post.results[0]} setPosts={setPost} postPage />

        {/* Comments and comment form container */}
        <Container fluid className={appStyles.Content}>
          {/* Show comment form if user is logged in */}
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {/* Display comments using InfiniteScroll */}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            // Display if user is logged in but no comments exist
            <span>No comments yet, be the first to comment!</span>
          ) : (
            // Display if not authenticated and no comments exist
            <span>No comments...yet</span>
          )}
        </Container>
      </Col>

      {/* Sidebar with popular content (visible only on large screens) */}
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
        <PopularLocations />
        <PopularPosts />
      </Col>
    </Row>
  );
}

export default PostPage;
