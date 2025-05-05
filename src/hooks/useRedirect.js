import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../api/axios";

// Custom hook to redirect users based on their authentication status
export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        // Try refreshing the token — if successful, user is authenticated
        await api.post("/dj-rest-auth/token/refresh/");
        // If the user is already logged in and tries to access a restricted page, redirect them home
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        // If token refresh fails, user is unauthenticated
        // If user is expected to be logged out and tries to access a protected page, redirect to login
        if (userAuthStatus === "loggedOut") {
          history.push("/login");
        }
      }
    };
    // Invoke the redirect logic on mount
    handleMount();
    // Effect re-runs if history or auth status changes
  }, [history, userAuthStatus]);
};
