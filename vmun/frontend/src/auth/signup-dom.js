import React, { useContext } from "react";

import "antd/dist/antd.css";
import { Form, Input } from 'antd';
import jQuery from "jquery";

import { useHistory } from "react-router-dom";

import { VmunContext } from "../vmun/context.js";


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = jQuery.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
      }
    }
  }
  return cookieValue;
}


function fetchData(url, met, data=null) {
  return fetch(url, {
    method: met,
    credentials: 'same-origin',
    headers: {
      "Accept": "application/json",
      'X-Requested-With': 'XMLHttpRequest',
      "X-CSRFToken": getCookie("csrftoken")
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if (response.status === 400) {
      return response.json()
      .then((json) => {
        return Promise.reject(json);
      })
    } else {
      return response.json();
    }
  });
}

function Signup() {
  const handleSubmit = values => {post_signup(values);}
  const [state, dispatch] = useContext(VmunContext);
  const history = useHistory();
  const layout = {labelCol: { span: 5 }, wrapperCol: { span: 19 }};

  function post_signup(data) {
    let ctxt = {'username': data.username, 'password': data.password, 'first_name': data.first_name,
                'last_name': data.last_name, 'gender': data.gender, 'birthday': data.birthday}
    fetchData("http://127.0.0.1:8000/accounts/ajaxsignup", 'POST', ctxt)
    .then((json) => {
      history.push("/accounts/login");
    })
  }

  return (
    <></>
  )
}

export default Signup;