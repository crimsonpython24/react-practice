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
      <Router>
        <ul>
          <Switch>
            <Route exact path="/">
              <h1><Link to='/'>Home</Link></h1>
              {state.conferences.map((conf) => (
                <li key={conf.id}>
                  {conf.title}
                  <Link to={`/conference/${conf.slug}/`}>Link</Link>
                </li>
              ))}
            </Route>
            <Route path={`/conference/:confId/`}>
              <Conference></Conference>
            </Route>

          </Switch>
        </ul>
      </Router>
    </>
  )
}

export default Home;