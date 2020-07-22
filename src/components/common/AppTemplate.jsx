import React from "react";
import { Container } from "@material-ui/core";

const AppTemplate = ({ header, left, body, right, bottom }) => {
  return (
    <div className="app-template">
      <div className="appbar">{header}</div>
      <div className="left">{left}</div>
      <div className="body"><Container>{body}</Container></div>
      <div className="right">{right}</div>
      <div className="bottom">{bottom}</div>
    </div>
  );
};

export default AppTemplate;
