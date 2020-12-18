import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";

import VmunContextProvider from './vmun/context';
import Vmun from './vmun/dom';
import "./index.css";


let development = true;                               // use true while testing in 3000
let url = !development ? "initstate" : "teststate";   // use TESTUSER_ID=1 when running with teststate


fetch(`http://127.0.0.1:8000/accounts/${url}`)
  .then(res => res.json())
  .then(
    (data) => {
      const initialState = {
        user: data.user,
        conferences: data.conferences,
      };
      console.log(data);
      const App = () => {
        return (
          <VmunContextProvider initState={initialState}>
            <Vmun/>
          </VmunContextProvider>
        )
      };
      ReactDOM.render(<App />, document.getElementById('root'));
    }
  )