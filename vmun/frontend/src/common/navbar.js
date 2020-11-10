import React, { useContext } from "react";
import "antd/dist/antd.css";
import { PageHeader, Dropdown, Button, Tag, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { VmunContext } from '../vmun/context.js';


const menu = (
  <Menu>
    <Menu.Item><Link to="/feedback">Feedback</Link></Menu.Item>
    <Menu.Item><Link to="/development">Development</Link></Menu.Item>
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

function Navbar() {
  const [state, dispatch] = useContext(VmunContext);

  function extras(authenticated) {
    console.log("auth", authenticated);
    if (authenticated) {
      return (
        <>
          <Avatar icon={<UserOutlined />} key={1} />
          <DropdownMenu key="more" />
        </>
      )
    } else {
      return (
        <>
          <Button type="primary">Primary Button</Button>
          <DropdownMenu key="more" />
        </>
      )
    }
  }

  return (
    <PageHeader
      title={<Link to="/" style={{ color: "#262626" }}>vMun</Link>}
      className="site-page-header"
      subTitle="MUN conference on the web"
      tags={<Tag color="green">Running</Tag>}
      extra={[ extras(state.user.authenticated) ]}
    ></PageHeader>
  )
}

export default Navbar;
