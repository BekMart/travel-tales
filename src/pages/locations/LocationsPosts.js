import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { formatSlug } from "../../utils/utils";
import { axiosReq } from "../../api/axios";
import Post from "../posts/Post";
import PopularProfiles from "../profiles/PopularProfiles";
import PopularLocations from "./PopularLocations";
import PopularPosts from "../posts/PopularPosts";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import appStyles from "../../App.module.css";

// Create posts associated with specific location
function LocationsPosts() {
  // Get the location slug from the URL
  const { slug } = useParams();
  // Local state to store posts for the given location
  const [posts, setPosts] = useState({ results: [] });

  // Fetch posts associated with the current location slug
  useEffect(() => {
    const fetchLocationPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/locations/${slug}/posts/`);
        setPosts({ results: data.results });
      } catch (err) {
        // console.log(err);
      }
    };
    fetchLocationPosts();
    // Re-run fetch when slug changes
  }, [slug]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <div>
          {/* Page header using formatted slug for capitalisation */}
          <h2 className={appStyles.PageHeading}>{formatSlug(slug)}</h2>

          {/* Render posts if found, otherwise show "no results" asset */}
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

      {/* Sidebar with popular items (visible only on large screens) */}
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
        <PopularLocations />
        <PopularPosts />
      </Col>
    </Row>
  );
}

export default LocationsPosts;
