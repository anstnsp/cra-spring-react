import React from "react";
import { ACCESS_TOKEN } from "../../../constants";
import { Redirect } from "react-router-dom";

const OAuth2RedirectHandler = ({ history, location, match }) => {
  const getUrlParameter = (name2) => {
    console.log(location.search);
    const name = name2.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    const results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };
  const token = getUrlParameter("token");
  const error = getUrlParameter("error");

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: location },
        }}
      />
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: "/signin",
          state: {
            from: location,
            error: error,
          },
        }}
      />
    );
  }
};

export default OAuth2RedirectHandler;
