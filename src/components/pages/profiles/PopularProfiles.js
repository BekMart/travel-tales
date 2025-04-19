import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../../App.module.css";
import { axiosReq } from "../../../api/axios";
import { useCurrentUser } from "../../../contexts/CurrentUserContext";
import Asset from "../../Asset";

const PopularProfiles = () => {
  const [profileData, setProfileData] = useState({
    // Use pageProfile later
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const { popularProfiles } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [currentUser]);

  return (
    <Container className={appStyles.Content}>
      <p>Top profiles:</p>
      {popularProfiles.results.length ? (
        <>
          {popularProfiles.results.map((profile) => (
            <p key={profile.id}>{profile.owner}</p>
          ))}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
