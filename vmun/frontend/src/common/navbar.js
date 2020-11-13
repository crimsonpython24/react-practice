import React, { useContext } from "react";
import "antd/dist/antd.css";
import { PageHeader, Dropdown, Button, Tag, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive'

import { VmunContext } from '../vmun/context.js';
import ProfileCard from './profilecard.js'


const menu = (
  <Menu>
    <Menu.Item><Link to="/feedback">Feedback</Link></Menu.Item>
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

const profcard = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

function Navbar() {
  const [state, dispatch] = useContext(VmunContext);
  const shrinkNavbar = useMediaQuery({ query: '(max-width: 533px)' })
  const shrinkTag = useMediaQuery({ query: '(max-width: 374px)' })

  function extras(authenticated, shrink) {
    if (shrink) return null;
    if (authenticated) {
      return (
        <>
          <Dropdown overlay={<ProfileCard/>} placement="bottomLeft" trigger={['click']}>
            <Avatar icon={<UserOutlined />} key={1} />
          </Dropdown>
          <DropdownMenu key="more" />
        </>
      )
    } else {
      return (
        <>
          <Link to="/accounts/signup" key="signup"><Button>Sign up</Button></Link>
          <Link to="/accounts/login" key="login"><Button type="primary">Log in</Button></Link>
        </>
      )
    }
  }

  function addTag(shrink) {
    return !shrink && <Tag color="green">Running</Tag>
  }

  // add switch for the index

  return (
    <PageHeader
      title={<Link to="/" style={{ color: "#262626" }}>vMun</Link>}
      className="site-page-header"
      subTitle="MUN conference on the web"
      tags={ addTag(shrinkTag) }
      extra={ extras(state.user.authenticated, shrinkNavbar) }
    ></PageHeader>
  )
}

export default Navbar;
