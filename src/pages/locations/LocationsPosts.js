import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axios";
import Post from "../posts/Post";
import NoResults from "../../assets/no-results.png";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";

function LocationsPosts() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchLocationPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/locations/${slug}/posts/`);
        setPosts(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLocationPosts();
  }, [slug]);

  return (
    <div className="p-4">
      <h2>{slug}</h2>
      {posts.length ? (
        posts.map((post) => (
          <Post key={post.id} {...post} setPosts={setPosts} />
        ))
      ) : (
        <Container className={appStyles.Content}>
          <Asset src={NoResults} message={'No posts found for this location'} />
        </Container>
      )}
    </div>
  );
}

export default LocationsPosts;
