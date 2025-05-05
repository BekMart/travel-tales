import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import api from "../../api/axios";
import Post from "./Post";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import PopularProfiles from "../profiles/PopularProfiles";
import PopularLocations from "../locations/PopularLocations";
import PopularPosts from "./PopularPosts";
import appStyles from "../../App.module.css";

// Custom hook to get the current URL search parameters
const useQuery = () => new URLSearchParams(useLocation().search);

// Page to display posts matching a search query from the URL (?q=keyword)
const SearchResultsPage = () => {
  // Extract the "q" query string value
  const query = useQuery().get("q");
  // Store search results
  const [posts, setPosts] = useState({ results: [] });
  // Track loading state
  const [hasLoaded, setHasLoaded] = useState(false);

  // Fetch posts when the search query changes
  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Search posts
        const { data } = await api.get(`/posts/?search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    if (query) {
      // Reset loading state
      setHasLoaded(false);
      // Trigger new search
      fetchResults();
    } else {
      // If query is empty, show no results
      setPosts({ results: [] });
      setHasLoaded(true);
    }
  }, [query]);

  return (
    <Row className="h-100">
      {/* Main column with search results */}
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Heading stating what the search is for */}
        <h2 className={appStyles.PageHeading}>Search Results for "{query}"</h2>

        {hasLoaded ? (
          <>
            {/* Display posts if results found - using infinite scroll */}
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
              // Display default image and message if no results found
              <Container className={appStyles.Content}>
                <Asset
                  src={NoResults}
                  message={
                    <>
                      No results found for "{query}". <br /> Please adjust the
                      search keyword and try again.
                    </>
                  }
                />
              </Container>
            )}
          </>
        ) : (
          // Initial loading spinner
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>

      {/* Sidebar with popular content – visible only on large screens */}
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
        <PopularLocations />
        <PopularPosts />
      </Col>
    </Row>
  );
};

export default SearchResultsPage;
