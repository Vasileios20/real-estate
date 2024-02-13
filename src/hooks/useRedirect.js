import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const useRedirect = (useAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        // if the user is logged in, redirect to the home page
        if (useAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        // if the user is logged out, redirect to the login page
        if (useAuthStatus === "loggedOut") {
          history.push("/signin");
        }
      }
    };
    handleMount();
  }, [history, useAuthStatus]);
};
