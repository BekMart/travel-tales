import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import api from "../../../api/axios";
import Post from "./Post";
import Asset from "../../Asset";
import appStyles from "../../../App.module.css";
import NoResults from "../../../assets/no-results.png";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResultsPage = () => {
  const query = useQuery().get("q");
  const [posts, setPosts] = useState([]);
//   const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const [postsRes] = await Promise.all([
          api.get(`/posts/?search=${query}`),
          api.get(`/profiles/?search=${query}`),
        ]);
        setPosts(postsRes.data.results || postsRes.data);
        // setProfiles(profilesRes.data.results || profilesRes.data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setLoading(false);
      setPosts([]);
    //   setProfiles([]);
    }
  }, [query]);

  return (
    <Container>
      <h2 className="my-4">Search Results for "{query}"</h2>

      {loading ? (
        <Container className={appStyles.Content}>
          <Asset spinner />
        </Container>
      ) : (
        <>
          {posts.length ? (
            <Row>
              {posts.map((post) => (
                <Col md={6} lg={4} key={post.id}>
                  <Post {...post} />
                </Col>
              ))}
            </Row>
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message="No results found for that search. Please try again." />
            </Container>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchResultsPage;
