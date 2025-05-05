import React from "react";
import Container from "react-bootstrap/Container";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";

// Component to display the top 5 most-followed profiles on larger screens
const PopularProfiles = () => {
  // Access popular profiles from context
  const { popularProfiles } = useProfileData();

  return (
    <>
      {popularProfiles.results.length ? (
        <Container className={appStyles.Content}>
          <p className={appStyles.PopularHeading}>Top 5 profiles:</p>
          {/* Sort by followers and display top 5 profiles */}
          {[...popularProfiles.results]
            .sort((a, b) => b.followers_count - a.followers_count)
            .slice(0, 5)
            .map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))}
        </Container>
      ) : (
        // Show a spinner while profiles are being fetched
        <Asset spinner />
      )}
    </>
  );
};

export default PopularProfiles;
