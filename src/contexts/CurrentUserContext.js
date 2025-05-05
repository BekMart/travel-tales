import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";
import axios from "axios";
import api, { axiosReq, axiosRes } from "../api/axios";

// Create contexts to store and update the current authenticated user
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Custom hooks for accessing current user context
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// Context provider to manage current user state across the app
export const CurrentUserProvider = ({ children }) => {
  // Store the logged-in user's data
  const [currentUser, setCurrentUser] = useState(null);
  // Used for redirecting on auth failures
  const history = useHistory();

  // Fetch the currently authenticated user when the component mounts
  const handleMount = async () => {
    try {
      const { data } = await axiosReq.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      // console.log(err);
    }
  };

  // Call handleMount once on mount to initialize user state
  useEffect(() => {
    handleMount();
  }, []);

  // Setup Axios interceptors for token refresh handling
  useMemo(() => {
    // Request interceptor: check if token needs refreshing before sending a request
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await api.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            // Token refresh failed: log user out and redirect to login
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/login");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // Response interceptor: handle 401 errors (unauthorized)
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await api.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  // Provide current user state and updater to the component tree
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
