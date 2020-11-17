import React from "react";

import "antd/dist/antd.css";

import { Switch, Route, useRouteMatch, Link } from "react-router-dom";

import Chat from "../main/development/chat.js";
import Todo from "../main/development/todo.js"
import Blank from "../main/development/blank.js"


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
              <Link to={`${match.url}/chats`}>Chats</Link>
            </li>
            <li>
              <Link to={`${match.url}/blank`}>Nothing</Link>
            </li>
          </ul>
        </Route>
        <Route path={`${match.path}/todos`}>
          <Todo/>
        </Route>
        <Route path={`${match.path}/chats`}>
          <Chat/>
        </Route>
        <Route path={`${match.path}/blank`}>
          <Blank/>
        </Route>
      </Switch>
    </>
  )
}

export default Development;