import React, { useContext } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../../src/main/home";
import Feedback from "../../src/main/feedback";
import Development from "../../src/main/development";
import Welcome from "../../src/main/welcome";
import Login from "../../src/auth/login-dom";
import Signup from "../../src/auth/signup-dom";

// TODO fix import into another separate file
import Conference from "../main/home.js"

import Navbar from "../../src/common/navbar";
import { VmunContext } from './context';


const Vmun = () => {
  const [state, dispatch] = useContext(VmunContext);
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route path="/welcome"><Welcome/></Route>
          <Route path="/accounts/login"><Login/></Route>
          <Route path="/accounts/signup"><Signup/></Route>
          <Route path="/feedback"><Feedback/></Route>
          <Route path="/development"><Development/></Route>
          
          <Route path={`/conference/:confId/`}>
            <Conference></Conference>
          </Route>

        </Switch>
      </Router>
    </>
  );
};

export default Vmun;
