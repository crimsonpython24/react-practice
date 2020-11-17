import React, { useContext } from "react";
import "antd/dist/antd.css";

import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";

import { VmunContext } from '../vmun/context';

import Login from "../auth/login-dom";

function Welcome() {
  const [state, dispatch] = useContext(VmunContext);
  if (state.user.authenticated) {
    return <Redirect to={'/'} />
  }

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