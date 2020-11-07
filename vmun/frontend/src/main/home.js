import React, { useContext } from 'react';
import "antd/dist/antd.css";

import { Redirect } from "react-router-dom";
import { VmunContext } from '../vmun/context';

function Home() {
  const [state, dispatch] = useContext(VmunContext);
  console.log('homestate', state)
  if (!state.user.authenticated) {
    return <Redirect to={'/welcome'} />
  }
  return <h1>Home</h1>
}

export default Home;