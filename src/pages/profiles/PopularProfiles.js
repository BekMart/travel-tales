import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <>
      {popularProfiles.results.length ? (
        <>
          {!mobile && (
            <Container className={appStyles.Content}>
              <p className={appStyles.Heading}>Top 5 profiles:</p>
              {[...popularProfiles.results]
                .sort((a, b) => b.followers_count - a.followers_count)
                .slice(0, 5)
                .map((profile) => (
                  <Profile key={profile.id} profile={profile} />
                ))}
            </Container>
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </>
  );
};

export default PopularProfiles;
