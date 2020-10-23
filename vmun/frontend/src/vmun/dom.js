import React, { useContext, useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../../src/main/home";
import Feedback from "../../src/main/feedback";
import Development from "../../src/main/development";
import Articles from "../../src/main/articles";
import Login from "../../src/auth/login-dom";
import Signup from "../../src/auth/signup-dom";

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
          <Route path="/accounts/login"><Login/></Route>
          <Route path="/accounts/signup"><Signup/></Route>
          <Route path="/feedback"><Feedback/></Route>
          <Route path="/development"><Development/></Route>
          <Route path="/articles"><Articles/></Route>
        </Switch>
      </Router>

      <h2>Account: {state.user.id || -1} | {state.user.username}</h2>
      {state.todos.map((todo, index) => (
        <div className={`column-item ${todo.completed ? 'completed' : null}`} key={index}>
          <div className="flex-container">
            <div className="todo-name">
              {index+1}: {todo.fields.title}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Vmun;
