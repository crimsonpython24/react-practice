import React from "react";
import { BrowserRouter as Router, Switch, Route, useRouteMatch, Link } from "react-router-dom";
import "antd/dist/antd.css";
import Todo from "../todo/index";

// TODO (ha ha): fix styles and routing format
// Routing present in index.js (outmost)
function Development() {
  let { path, url } = useRouteMatch();
  return (
    <>
      <Router>
        {/* <Link to={`${url}/todo`}>Todos</Link> */}
        {/* <Switch>
          <Route exact path={path}></Route>
          <Route exact path={`${path}/todo`}>
            <Todo/>
          </Route>
        </Switch> */}
      </Router>
    </>
  )
}

export default Development;