import React, { useContext, useEffect } from "react";

import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Row, Col, Typography } from 'antd';
import jQuery from "jquery";

import { useMediaQuery } from 'react-responsive'
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { VmunContext } from "../vmun/context.js";

const { Text } = Typography;


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
  const onSubmit = values => {post_login(values);}
  // const onSubmit = values => {console.log('on submit', values)}
  const [state, dispatch] = useContext(VmunContext);
  const history = useHistory();
  const shrinkTailLayout = useMediaQuery({ query: '(max-width:575px)' })
  const layout = {labelCol: { span: 5 }, wrapperCol: { span: 19 }};
  const tailLayout = {wrapperCol: { offset: 5, span: 19 }};
  const tailLayoutSm = {wrapperCol: { span: 24 }};

  const { register, trigger, errors, setError, handleSubmit, setValue } = useForm();

  const handleUsernameChange = (e) => {
    setValue("username", e.target.value);
    trigger('username');
  }

  const handlePasswordChange = (e) => {
    setValue("password", e.target.value);
    trigger('password');
  }

  // add regex validation later
  useEffect(() => {
    register("username", {required: true}); 
    register("password", {required: true}); 
  }, [register])

  function post_login(data) {
    fetchData("http://127.0.0.1:8000/accounts/ajaxlogin", 'POST', {'username': data.username, 'password': data.password})
    .then((userdata) => {
      if (userdata.errors) {
        Object.keys(userdata.errors).forEach(key => {
          setError(key, {
            type: "manual",
            message: userdata.errors[key],
          });
        })
      } else {
        dispatch({
          type: 'LOGGED_IN', userdata,
        });
        history.push("/");
      }
    })
    // .catch((json) => setNoNameError(JSON.stringify(json)));
  }

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "500px", padding: "30px" }}>
      <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={handleSubmit(onSubmit)} requiredMark={false}>
        <Form.Item label="Username">
          {/* make this thing look better pls SERIOUSLY */}
          <Input name="username" onChange={handleUsernameChange} />
          {/* probably create differnt cases for front and back end validation */}
          {errors.username && <p>a {errors.username.message} a</p>}
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password  name="password" onChange={handlePasswordChange} />
          {errors.password && <p>a {errors.password.message} a</p>}
        </Form.Item>
        { !shrinkTailLayout &&
          <>
            <Row>
              <Col span={5}></Col>
              <Col span={19}>
                <Text type="secondary">
                  Not registered? <Link to="/accounts/signup" key="signup">Sign up</Link>
                </Text>
              </Col>
            </Row>
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item {...tailLayout}><Button type="primary" htmlType="submit">Submit</Button></Form.Item>
          </>
        }
        { shrinkTailLayout &&
          <>
          <Text type="secondary">
            Not registered? <Link to="/accounts/signup" key="signup">Sign up</Link>
          </Text>
            <Form.Item {...tailLayoutSm} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item {...tailLayoutSm}><Button type="primary" htmlType="submit">Submit</Button></Form.Item>
          </>
        }
      </Form> 
    </div>
    
  )
}

export default Login;