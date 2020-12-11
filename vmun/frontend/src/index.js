import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";

import VmunContextProvider from './vmun/context';
import Vmun from './vmun/dom';
import "./index.css";


let development = false;        // use true while testing in 3000
let url = !development ? "initstate" : "teststate";

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

fetch(`http://127.0.0.1:8000/accounts/${url}`)
  .then(res => res.json())
  .then(
    (data) => {
      setCookie('csrftoken', data.csrftoken, 10000)
      const initialState = {
        user: data.user,
        conferences: data.conferences,
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