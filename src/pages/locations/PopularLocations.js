import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axios";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";

// Component to display the top 5 most popular locations on larger screens
const PopularLocations = () => {
  // Local state to store top locations
  const [locations, setLocations] = useState([]);

  // Fetch locations on mount and store the top 5
  useEffect(() => {
    const fetchTopLocations = async () => {
      try {
        const { data } = await axiosReq.get("/locations/");
        setLocations(data.results.slice(0, 5));
      } catch (err) {
        // console.log(err);
      }
    };
    fetchTopLocations();
  }, []);

  return (
    <Container className={appStyles.Content}>
      {/* Display locations if data is available */}
      {locations.length ? (
        <>
          <p className={appStyles.PopularHeading}>Top 5 locations:</p>
          <div>
            {/* List the locations as a link with its assciated image and name */}
            {locations.map((location) => (
              <Link
                key={location.slug}
                to={`/locations/${location.slug}`}
                className="my-3 d-flex align-items-center text-decoration-none"
              >
                {/* Display location image or placeholder */}
                <img
                  src={location.image || "/placeholder.jpg"}
                  alt=""
                  width="60"
                  height="60"
                  className="rounded me-2"
                />

                {/* Location name */}
                <div className={`mx-2 ${appStyles.WordBreak}`}>
                  <strong>{location.name}</strong>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        // Show loading spinner while fetching data
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularLocations;
