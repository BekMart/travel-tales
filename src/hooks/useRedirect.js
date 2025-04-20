import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../api/axios";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await api.post("/dj-rest-auth/token/refresh/");
        // This code will run if the user is logged in
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        // This code will run if user is NOT logged in
        if (userAuthStatus === "loggedOut") {
          history.push("/login");
        }
      }
    };
    handleMount();
  }, [history, userAuthStatus]);
};
