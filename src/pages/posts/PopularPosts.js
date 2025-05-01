import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axios";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/Post.module.css";

const PopularPosts = ({ mobile }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const { data } = await axiosReq.get("/posts/popular/");
        setPosts(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTopPosts();
  }, []);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {posts.length ? (
        <>
          <p className={appStyles.Heading}>Top 5 posts:</p>
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              className={`my-3 d-flex align-items-center text-decoration-none ${
                mobile && "flex-column text-center"
              }`}
            >
              <img
                src={post.image}
                alt=""
                width="60"
                height="60"
                className="rounded me-2"
              />
              <div className={`mx-2 ${styles.WordBreak}`}>
                <strong>{post.title}</strong>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularPosts;
