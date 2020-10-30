import React from "react";
import "antd/dist/antd.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "../auth/login-dom";

function Welcome() {
  return (
    <>
      <Link to="/accounts/login" style={{ paddingLeft: "20px" }}>Log in</Link>
      <h2 style={{ paddingLeft: "20px" }}>Please log in to view the contents of the site</h2>
      <Router>
        <Switch>
          <Route path="/accounts/login">
            <Login/>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default Welcome;