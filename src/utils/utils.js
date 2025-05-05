import { axiosReq } from "../api/axios";
import jwtDecode from "jwt-decode";

/**
 * Fetches the next page of data for infinite scroll and appends it to the current resource.
 * Prevents duplicate entries based on item ID.
 */
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
    // console.log(err);
  }
};

/**
 * Increments follower/following counts after a follow action.
 * Updates the clicked profile's follower count and sets `following_id`.
 * Updates the logged-in user's following count.
 */
export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? {
        ...profile,
        following_count: profile.following_count + 1,
      }
    : profile;
};

/**
 * Decrements follower/following counts after an unfollow action.
 * Removes the `following_id` from the clicked profile.
 * Updates the logged-in user's following count.
 */
export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? {
        ...profile,
        following_count: profile.following_count - 1,
      }
    : profile;
};

/**
 * Converts a slug to a readable format.
 * Split words that are joined by "-" and capitalising text.
 */
export const formatSlug = (slug) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

/**
 * Capitalises the first letter of every word in a given string.
 * Used for title and location inputs.
 */
export function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) =>
      word.length > 0 ? word[0].toUpperCase() + word.slice(1).toLowerCase() : ""
    )
    .join(" ");
}

/**
 * Stores the expiration time of the refresh token in localStorage.
 * Used to determine when to attempt token refresh.
 */
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

/**
 * Checks if a token timestamp exists in localStorage.
 * Used to decide whether to try refreshing the token.
 */
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

/**
 * Removes the token expiration timestamp from localStorage.
 * Called when user logs out or the token becomes invalid.
 */
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
