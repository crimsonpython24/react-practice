import React, { useContext } from 'react';

import "antd/dist/antd.css";

import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { VmunContext } from '../vmun/context';
import Conference from "./conference/conference.js"

function Home() {
  const [state, dispatch] = useContext(VmunContext);

  if (!state.user.authenticated) {
    return <Redirect to={'/welcome'} />
  }
  return (
    <>
      <h1><Link to='/'>Home</Link></h1>
      <Link to="/conference">Conference Dashboard</Link>
      <ul>
        {state.conferences.map((conf) => (
          <li key={conf.id}>
            {conf.title}
            <Link to={`/conference/slug/${conf.slug}`}>Link</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Home;