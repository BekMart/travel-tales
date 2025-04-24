import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

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
    <div className="p-4">
      <h2>All Locations</h2>
      {locations.results.length ? (
        <InfiniteScroll
          dataLength={locations.results.length}
          next={() => fetchMoreData(locations, setLocations)}
          hasMore={!!locations.next}
          loader={<Asset spinner />}
        >
          {locations.results.map((location) => (
            <div key={location.slug} className="location-card">
              <Link to={`/locations/${location.slug}`}>
                <img
                  src={location.image || "/placeholder.jpg"}
                  alt={location.name}
                  width="250"
                  height="250"
                />
                <h4>{location.name}</h4>
                <p>{location.posts_count} posts</p>
              </Link>
            </div>
          ))}
        </InfiniteScroll>
      ) : (
        <Asset spinner />
      )}
    </div>
  );
}

export default Locations;
