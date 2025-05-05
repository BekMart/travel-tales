import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axios";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";

// Component to display the top 5 most-popular posts on larger screens
const PopularPosts = () => {
  // Local state to store top posts
  const [posts, setPosts] = useState([]);

  // Fetch posts on mount and store the top 5
  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const { data } = await axiosReq.get("/posts/popular/");
        setPosts(data.results.slice(0, 5));
      } catch (err) {
        // console.log(err);
      }
    };
    fetchTopPosts();
  }, []);

  return (
    <Container className={appStyles.Content}>
      {/* Display posts if data is available */}
      {posts.length ? (
        <>
          {/* List the posts as a link with its assciated image and title */}
          <p className={appStyles.PopularHeading}>Top 5 posts:</p>
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              className="my-3 d-flex align-items-center text-decoration-none"
            >
              {/* Post image */}
              <img
                src={post.image}
                alt=""
                width="60"
                height="60"
                className="rounded me-2"
              />

              {/* Post title */}
              <div className={`mx-2 ${appStyles.WordBreak}`}>
                <strong>{post.title}</strong>
              </div>
            </Link>
          ))}
        </>
      ) : (
        // Show loading spinner while fetching data
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularPosts;
