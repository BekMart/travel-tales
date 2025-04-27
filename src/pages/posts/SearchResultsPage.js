import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import api from "../../api/axios";
import Post from "./Post";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import PopularLocations from "../locations/PopularLocations";
import PopularPosts from "./PopularPosts";
import NoResults from "../../assets/no-results.png";
import appStyles from "../../App.module.css";
import styles from "../../styles/Post.module.css";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResultsPage = () => {
  const query = useQuery().get("q");
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await api.get(`/posts/?search=${query}`);
        setPosts({ results: data.results || [] });
        setHasLoaded(true);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    if (query) {
      setHasLoaded(false);
      fetchResults();
    } else {
      setPosts({ results: [] });
      setHasLoaded(true);
    }
  }, [query]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <h2 className={styles.Header}>Search Results for "{query}"</h2>

        {hasLoaded ? (
          <>
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
              <Container className={appStyles.Content}>
                <Asset
                  src={NoResults}
                  message={`No results found for "${query}". Please try again.`}
                />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>

      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
        <PopularLocations />
        <PopularPosts />
      </Col>
    </Row>
  );
};

export default SearchResultsPage;
