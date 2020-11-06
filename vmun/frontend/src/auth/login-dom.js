import React from "react";
import "antd/dist/antd.css";

import { Form, Input, Button, Checkbox } from 'antd';
import jQuery from "jquery";

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


function Login() {
  const layout = {labelCol: { span: 8 }, wrapperCol: { span: 16 },};
  const tailLayout = {wrapperCol: { offset: 8, span: 16 },};
  const handleSubmit = values => {post_login(values);}
  
  function post_login(data) {
    fetchData("http://127.0.0.1:8000/accounts/ajaxlogin", 'POST', {'username': data.username, 'password': data.password})
    .then((json) => {
      // dispatch({
      //   type: 'ADD_TODO', name: json.name, complete: json.complete, id: json.id
      // });
      // setValue('name', '', { shouldValidate: false });
      console.log(json);
      if (json.login) {
      }
    })
    // .catch((json) => setNoNameError(JSON.stringify(json)));
  }

  return (
    <div style={{ width: "600px", paddingTop: "20px" }}>
      <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={handleSubmit}>
        <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login;