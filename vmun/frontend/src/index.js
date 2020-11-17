import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import VmunContextProvider from './vmun/context';
import Vmun from './vmun/dom';


let development = false;        // use true while testing in 3000
let url = !development ? "initstate" : "teststate";

fetch(`http://127.0.0.1:8000/accounts/${url}`)
  .then(res => res.json())
  .then(
    (data) => {
      const initialState = {
        user: data.user,
        conferences: data.conferences
      };
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
