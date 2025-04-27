import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axios";
import styles from "../../styles/Location.module.css";

const PopularLocations = ({ mobile }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchTopLocations = async () => {
      try {
        const { data } = await axiosReq.get("/locations/");
        setLocations(data.results.slice(0, 5));
      } catch (err) {
        console.log(err);
      }
    };
    fetchTopLocations();
  }, []);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none  text-center mb-3"
      }`}
    >
      {locations.length ? (
        <>
          <p className={appStyles.Heading}>Top 5 locations:</p>
          <div>
            {locations.map((location) => (
              <Link
                key={location.slug}
                to={`/locations/${location.slug}`}
                className={`my-3 d-flex align-items-center text-decoration-none ${
                  mobile && "flex-column text-center"
                }`}
              >
                <img
                  src={location.image || "/placeholder.jpg"}
                  alt={location.name}
                  width="60"
                  height="60"
                  className="rounded me-2"
                />
                <div className={`mx-2 ${styles.WordBreak}`}>
                  <strong>{location.name}</strong>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularLocations;
