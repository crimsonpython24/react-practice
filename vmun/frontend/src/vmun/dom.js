import React, { useContext } from 'react';

import { Switch, Route } from "react-router-dom";

import Home from "../../src/main/home";
import Feedback from "../../src/main/feedback";
import Development from "../../src/main/development";
import Welcome from "../../src/main/welcome";
import Login from "../../src/auth/login-dom";
import Signup from "../../src/auth/signup-dom";
import ForgotPassword from "../../src/auth/forgot-pw-dom";
import Profile from "../../src/auth/profile-dom";
import Conference from "../main/conference/conference.js";
import AddConference from "../main/conference/addconference.js";
import MyConference from "../main/conference/myconference.js";
import ConferenceHome from "../main/conference/conference-home.js";
import Navbar from "../../src/common/navbar";
import { VmunContext } from './context';


const Vmun = () => {
  const [state, dispatch] = useContext(VmunContext);
  return (
    <>
      <Navbar/>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route path="/welcome/"><Welcome/></Route>
        <Route path="/accounts/login"><Login/></Route>
        {/* do signup when there are some time, too */}
        <Route path="/accounts/signup"><Signup/></Route>
        <Route path="/accounts/forgot-password"><ForgotPassword/></Route>
        {/* do the forgot password some time> */}
        <Route path="/accounts/profile"><Profile/></Route>
        <Route path="/feedback"><Feedback/></Route>
        <Route path="/development"><Development/></Route>
        
        <Route exact path="/conference"><ConferenceHome/></Route>
        <Route path="/conference/my"><MyConference/></Route>
        <Route path="/conference/add"><AddConference/></Route>
        <Route path={`/conference/slug/:confId`}><Conference/></Route>
      </Switch>
    </>
  );
};

export default Vmun;