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
import UserContextProvider from './user-context';
import { UserContext } from './user-context';
import { ConfigContext } from "antd/lib/config-provider";


fetch("http://127.0.0.1:8000/accounts/profiletest")
  .then(res => res.json())
  .then(
    (user) => {
      console.log(user.authenticated);
      const App = (user) => {
        return (
          <UserContextProvider initState={user}>
            {main()}
          </UserContextProvider>
        )
      };
      ReactDOM.render(<App />, document.getElementById('root'));
    }
  )

function main() {
  return (
    <>
      <Router>
        <UserContext.Consumer>
          {value => <p>Test auth: {value.authenticated}</p>}
        </UserContext.Consumer>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route path="/accounts/login"><Login/></Route>
          <Route path="/accounts/signup"><Signup/></Route>
          <Route path="/feedback"><Feedback/></Route>
          <Route path="/development"><Development/></Route>
          <Route path="/articles"><Articles/></Route>
        </Switch>
      </Router>
    </>
  )
}

ReactDOM.render(main(), document.getElementById("root"));
