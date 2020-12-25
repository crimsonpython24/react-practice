import React, { useContext, useEffect } from "react";

import "antd/dist/antd.css";
import { Input, Button, Form } from 'antd';
import jQuery from "jquery";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import { VmunContext } from '../../vmun/context.js';


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


function fetchData(url, met, data) {
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

function AddConference() {
  const onSubmit = values => {add_conference(values);}
  const { register, handleSubmit, setError, setValue } = useForm();

  function add_conference(data) {
    // add time fields later (complicated)
    console.log(data)
    fetchData("http://127.0.0.1:8000/conference/add", 'POST', {'title': data.title})
    .then((ret) => {
      if (ret.errors) {
        Object.keys(ret.errors).forEach(key => {
          // setError(key, {
          //   type: "manual",
          //   message: ret.errors[key],
          // });

          // add form validation LATER 
        })
      } else {
        // dispatch({
        //   type: 'UPDATED_PROFILE', ...ret,
        // });
        return <Redirect to={'/conferences/my'} />
      }
    })
  }

  const handleTitleChange = (e) => {
    setValue("title", e.target.value);
  }
  
  useEffect(() => {
    register("title", {required: "The title is required."});
  }, [register])

  return (
    <div style={{ paddingLeft: 40, paddingTop: 30 }}>
      <Form name="normal_login" className="login-form" onFinish={handleSubmit(onSubmit)}>
        <Input name="title" style={{ width: 350 }} placeholder="Title" onChange={handleTitleChange}/>
        <Button type="dashed" htmlType="submit">Primary Button</Button>
      </Form>
    </div>
  );
}

export default AddConference;