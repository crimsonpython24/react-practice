import React from "react";
import { BrowserRouter as Router, Switch, Route, useRouteMatch, Link } from "react-router-dom";
import "antd/dist/antd.css";


function Development() {
  let { path, url } = useRouteMatch();
  return (
    <>
      <h2>Nothing here yet!</h2>
    </>
  )
}

export default Development;