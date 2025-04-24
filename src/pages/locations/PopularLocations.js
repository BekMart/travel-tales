import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axios";

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
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {locations.length ? (
        <>
          <p>Top 5 locations:</p>
          <div className={mobile ? "d-flex justify-content-around flex-wrap" : ""}>
            {locations.map((location) => (
              <Link
                key={location.slug}
                to={`/locations/${location.slug}`}
                className="text-decoration-none mx-2"
              >
                <div className="text-center">
                  <img
                    src={location.image || "/placeholder.jpg"}
                    alt={location.name}
                    width="60"
                    height="60"
                    className="rounded-circle mb-2"
                  />
                  <p className="mb-0">{location.name}</p>
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
