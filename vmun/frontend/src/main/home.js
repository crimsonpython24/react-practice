import React, { useContext } from 'react';
import "antd/dist/antd.css";

import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";

import { VmunContext } from '../vmun/context';

function Home() {
  const [state, dispatch] = useContext(VmunContext);
  let { path, url } = useRouteMatch();

  if (!state.user.authenticated) {
    return <Redirect to={'/welcome'} />
  }
  return (
    <>
      <Router>
        <ul>
          <h1><Link to='/'>Home</Link></h1>
          <Switch>
            <Route exact path="/">
              {state.conferences.map((conf) => (
                <li key={conf.id}>
                  {conf.title}
                  <Link to={`/conference/${conf.slug}/`}>Link</Link>
                </li>
              ))}
            </Route>

            {/* TODO add a list of all conferences later somewhere round here (another route) */}
            
            <Route path={`/conference/:confId/`}>
              <Conference></Conference>
            </Route>

          </Switch>
        </ul>
      </Router>
    </>
  )
}

function Conference() {
  let { confId } = useParams();
  return <h3>Conference {confId}</h3>
}

export default Home;
