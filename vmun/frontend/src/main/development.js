import React from "react";
import { BrowserRouter as Router, Switch, Route, useRouteMatch, Link } from "react-router-dom";
import "antd/dist/antd.css";
import ToDo from "../todo/todo-dom";


function Development() {
  let { path, url } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={path}>
          <Link to={`${url}/todo`}>Todos</Link>
        </Route>
        <Route path={`${path}/todo`}>
          <ToDo/>
        </Route>
      </Switch>
    </>
  )
}

export default Development;