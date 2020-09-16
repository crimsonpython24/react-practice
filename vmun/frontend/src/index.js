import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../src/main/home";
import Feedback from "../src/main/feedback";
import Development from "../src/main/development";
import Articles from "../src/main/articles";
import Login from "../src/auth/login-dom";
import Signup from "../src/auth/signup-dom";
import Navbar from "../src/common/navbar";
import Todo from "./todo/index";


function main() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/accounts/login"><Login/></Route>
          <Route exact path="/accounts/signup"><Signup/></Route>
          <Route exact path="/feedback"><Feedback/></Route>
          <Route exact path="/development"><Development/></Route>
          <Route exact path="/development/todo"><Todo/></Route>
          <Route exact path="/articles"><Articles/></Route>
        </Switch>
      </Router>
    </>
  )
}

ReactDOM.render(main(), document.getElementById("root"));
