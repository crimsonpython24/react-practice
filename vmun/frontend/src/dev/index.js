import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "../index";

function Todo() {
  return <h2>Todo</h2>;
}

export default function DevIndex() {
  return (
    <>
      <h1>Test Project</h1>
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/todos">Todos</Link></li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route path="/todos" component={Todo}/>
        </Switch>
      </Router>
    </>
  )
}
