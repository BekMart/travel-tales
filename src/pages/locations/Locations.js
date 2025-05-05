import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";
import PopularProfiles from "../profiles/PopularProfiles";
import PopularLocations from "./PopularLocations";
import PopularPosts from "../posts/PopularPosts";
import { axiosReq } from "../../api/axios";
import styles from "../../styles/Location.module.css";
import appStyles from "../../App.module.css";

// Locations page that lists all available locations that have associated posts
function Locations() {
  // Local state to hold location data and pagination info
  const [locations, setLocations] = useState({ results: [], next: null });

  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await axiosReq.get("/locations/");
        // Populate results and next URL (for pagination)
        setLocations(data);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchLocations();
  }, []);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <h2 className={appStyles.PageHeading}>Locations</h2>
        {/* If locations exist, display them with infinite scroll */}
        {locations.results.length ? (
          <InfiniteScroll
            dataLength={locations.results.length}
            next={() => fetchMoreData(locations, setLocations)}
            hasMore={!!locations.next}
            loader={<Asset spinner />}
          >
            {locations.results.map((location) => (
              <Card key={location.slug} className={appStyles.Content}>
                {/* Image and link to location detail page */}
                <Link
                  to={`/locations/${location.slug}`}
                  className={styles.ImageLink}
                >
                  <Card.Img
                    variant="top"
                    src={location.image || "/placeholder.jpg"}
                    alt={location.name}
                    className="PostImg"
                  />
                </Link>

                {/* Location name below image */}
                <Card.Body className="text-center">
                  <Link
                    to={`/locations/${location.slug}`}
                    className={styles.Title}
                  >
                    {location.name}
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </InfiniteScroll>
        ) : (
          // Spinner shown initially while loading locations
          <Asset spinner />
        )}
      </Col>

      {/* Sidebar section for larger screens: shows popular items */}
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
        <PopularLocations />
        <PopularPosts />
      </Col>
    </Row>
  );
}

export default Locations;
