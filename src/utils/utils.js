import { axiosReq } from "../api/axios";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    console.log(err);
  }
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? // update followers count & following id of clicked on user
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? // Update following count of logged in user
      { ...profile, following_count: profile.following_count + 1 }
    : // return unchanged
      profile;
};

export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? // update followers count & following id of clicked on user
      {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? // Update following count of logged in user
      { ...profile, following_count: profile.following_count - 1 }
    : // return unchanged
      profile;
};

export const formatSlug = (slug) =>
  slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
