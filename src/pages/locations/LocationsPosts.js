import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axios";
import Post from "../posts/Post";
import NoResults from "../../assets/no-results.png";
import { Container, Row, Col } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import PopularProfiles from "../profiles/PopularProfiles";
import PopularLocations from "./PopularLocations";
import PopularPosts from "../posts/PopularPosts";
import { formatSlug } from "../../utils/utils";
import styles from "../../styles/Location.module.css";

function LocationsPosts() {
  const { slug } = useParams();
  const [posts, setPosts] = useState({ results: [] });

  useEffect(() => {
    const fetchLocationPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/locations/${slug}/posts/`);
        setPosts({ results: data.results });
      } catch (err) {
        console.log(err);
      }
    };
    fetchLocationPosts();
  }, [slug]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <div>
          <h2 className={styles.Header}>{formatSlug(slug)}</h2>
          {posts.results.length ? (
            posts.results.map((post) => (
              <Post key={post.id} {...post} setPosts={setPosts} />
            ))
          ) : (
            <Container className={appStyles.Content}>
              <Asset
                src={NoResults}
                message={`No posts found for ${formatSlug(slug)}.`}
              />
            </Container>
          )}
        </div>
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
        <PopularLocations />
        <PopularPosts />
      </Col>
    </Row>
  );
}

export default LocationsPosts;
