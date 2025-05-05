import { createContext, useContext, useState, useEffect } from "react";
import { useCurrentUser } from "../../src/contexts/CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";
import { axiosReq, axiosRes } from "../api/axios";

// For accessing profile data
export const ProfileDataContext = createContext();
// For updating profile data
export const SetProfileDataContext = createContext();

// Custom hooks to simplify context usage
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

// Context provider for managing profile-related data
export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    // Data for the currently viewed profile
    pageProfile: { results: [] },
    // Data for the sidebar popular profiles
    popularProfiles: { results: [] },
  });

  // Get the currently logged-in user
  const currentUser = useCurrentUser();

  // Handler to follow a user
  const handleFollow = async (clickedProfile) => {
    try {
      // Send POST request to follow the user
      const { data } = await axiosRes.post("followers/", {
        followed: clickedProfile.id,
      });

      // Update both pageProfile and popularProfiles to reflect the new follow state
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  // Handler to unfollow a user
  const handleUnfollow = async (clickedProfile) => {
    try {
      // Send DELETE request to remove follow relationship
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

      // Update both pageProfile and popularProfiles to reflect the unfollow state
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  // On mount (or when user changes), fetch the list of popular profiles
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Get top profiles ordered by follower count
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        // console.log(err);
      }
    };
    handleMount();
  }, [currentUser]);

  // Provide both profile data and updater functions to children components
  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={{ setProfileData, handleFollow, handleUnfollow }}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
