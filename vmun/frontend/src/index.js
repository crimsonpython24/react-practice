import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { PageHeader, Menu, Dropdown, Button, Tag } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const menu = (
  <Menu>
    <Menu.Item><Link to="/feedback">Feedback</Link></Menu.Item>
    <Menu.Item><Link to="/development">Development</Link></Menu.Item>
    <Menu.Item><Link to="/articles">Articles</Link></Menu.Item>
  </Menu>
);

const DropdownMenu = () => {
  return (
    <Dropdown key="more" overlay={menu} trigger={["click"]}>
      <Button style={{ border: "none", padding: 0 }}>
        <EllipsisOutlined
          style={{ fontSize: 20, verticalAlign: "middle" }}
        />
      </Button>
    </Dropdown>
  );
};

function Home() {
  return <h1>Home</h1>
}

function Login() {
  return <h1>Log in</h1>
}

function Signup() {
  return <h1>Sign up</h1>
}

function Feedback() {
  return <h1>Feedback</h1>
}
function Development() {
  return <h1>Development</h1>
}

function Articles() {
  return <h1>Articles</h1>
}

function main() {
  return (
    <>
      <Router>
        <PageHeader
          title={<Link to="/" style={{ color: "#262626" }}>vMun</Link>}
          className="site-page-header"
          subTitle="MUN conference on the web"
          tags={<Tag color="green">Running</Tag>}
          extra={[
            <Link to="/accounts/login" key="2">
              <Button>Log In</Button>
            </Link>,
            <Link to="/accounts/signup" key="1">
              <Button type="primary">Sign Up</Button>
            </Link>,
            <DropdownMenu key="more" />
          ]}
        ></PageHeader>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/accounts/login"><Login/></Route>
          <Route exact path="/accounts/signup"><Signup/></Route>
          <Route exact path="/feedback"><Feedback/></Route>
          <Route exact path="/development"><Development/></Route>
          <Route exact path="/articles"><Articles/></Route>
        </Switch>
      </Router>
    </>
  )
}

ReactDOM.render(main(), document.getElementById("root"));
