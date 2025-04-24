import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axios";

function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await axiosReq.get("/locations/");
        const filtered = data.results.filter((loc) => loc.posts_count > 0);
        setLocations(filtered);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="p-4">
      <h2>Locations</h2>
      {locations.map((location) => (
        <div key={location.slug} className="location-card">
          <Link to={`/locations/${location.slug}`}>
            <img
              src={location.image}
              alt={location.name}
              width="250"
              height="250"
            />
            <h4>{location.name}</h4>
            <p>{location.posts_count} posts</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Locations;
