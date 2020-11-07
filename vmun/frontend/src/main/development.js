import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import "antd/dist/antd.css";

import Articles from "../main/development/articles.js";
import Todo from "../main/development/todos.js"


function Development() {
  let match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`}>
          <h2>Developing Functionalities</h2>
          <ul>
            <li>
              <Link to={`${match.url}/todos`}>Todos</Link>
            </li>
            <li>
              <Link to={`${match.url}/articles`}>Articles</Link>
            </li>
          </ul>
        </Route>
        <Route path={`${match.path}/todos`}>
          <Todo/>
        </Route>
        <Route path={`${match.path}/articles`}>
          <Articles/>
        </Route>
      </Switch>
    </>
  )
}

export default Development;