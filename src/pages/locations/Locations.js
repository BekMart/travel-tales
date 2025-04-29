import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import { Row, Col, Card } from "react-bootstrap";
import PopularProfiles from "../profiles/PopularProfiles";
import PopularLocations from "./PopularLocations";
import PopularPosts from "../posts/PopularPosts";
import appStyles from "../../App.module.css";
import styles from "../../styles/Location.module.css";

function Locations() {
  const [locations, setLocations] = useState({ results: [], next: null });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await axiosReq.get("/locations/");
        setLocations(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLocations();
  }, []);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <h2 className={styles.Header}>Locations</h2>
        {locations.results.length ? (
          <InfiniteScroll
            dataLength={locations.results.length}
            next={() => fetchMoreData(locations, setLocations)}
            hasMore={!!locations.next}
            loader={<Asset spinner />}
          >
            {locations.results.map((location) => (
              <Card key={location.slug} className={appStyles.Content}>
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
          <Asset spinner />
        )}
      </Col>

      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
        <PopularLocations />
        <PopularPosts />
      </Col>
    </Row>
  );
}

export default Locations;
