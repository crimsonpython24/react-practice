import React, { useContext, useEffect } from "react";

import "antd/dist/antd.css";
import { Input, Button, Form } from 'antd';
import jQuery from "jquery";
import { useForm } from "react-hook-form";

import { VmunContext } from '../vmun/context.js';


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


function fetchData(url, met, data, csrf_token) {
  console.log(getCookie('csrftoken'))
  return fetch(url, {
    method: met,
    credentials: 'include',
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

function Profile() {
  const [state, dispatch] = useContext(VmunContext);
  const onSubmit = values => {update_profile(values);}
  const { register, handleSubmit, setError, setValue } = useForm();

  const handleEmailChange = (e) => {
    setValue("email", e.target.value);
  }


  function update_profile(data) {
    console.log("CSRF", state.csrftoken)
    // assume that user has csrf in state
    fetchData("http://127.0.0.1:8000/accounts/ajaxprofile", 'POST', {'email': data.email}, state.csrftoken)
    .then((ret) => {
      console.log('ASDFSADFSADFSDA', ret);
      if (ret.errors) {
        Object.keys(ret.errors).forEach(key => {
          setError(key, {
            type: "manual",
            message: ret.errors[key],
          });
        })
      } else {
        dispatch({
          type: 'UPDATED_PROFILE', ...ret,
        });
      }
    })
  }

  useEffect(() => {
    register("email", {required: "The email is required."});
  }, [register])

  return (
    <div style={{ paddingLeft: 40, paddingTop: 30 }}>
      <Form name="normal_login" className="login-form" onFinish={handleSubmit(onSubmit)}>
        <ul>
          <li>Username: {state.user.username}</li>
          <li>Email: {state.user.email}</li>
          <Input name="email" style={{ width: 350}} placeholder="New email address" onChange={handleEmailChange}/>
        </ul>
        <br></br>
        <Button type="dashed" htmlType="submit">Primary Button</Button>
      </Form>
    </div>
  );
}

export default Profile;