import React from "react";
import "antd/dist/antd.css";
import { PageHeader, Dropdown, Button, Tag, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';


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

function Navbar(authenticated) {
  console.log(authenticated);
  return (
    <PageHeader
      title={<Link to="/" style={{ color: "#262626" }}>vMun</Link>}
      className="site-page-header"
      subTitle="MUN conference on the web"
      tags={<Tag color="green">Running</Tag>}
      extra={[
        <Avatar icon={<UserOutlined />} />,
        <DropdownMenu key="more" />
      ]}
    ></PageHeader>
  )
}

export default Navbar;
