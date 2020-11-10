import React from "react";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";

// import test modules below
import { Card, Tooltip, Avatar } from 'antd';
import { LogoutOutlined, ExperimentOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const { Meta } = Card;


function ProfileCard() {

  function cardTitle(text) {
    return (
      <p style={{ height: "24.8px", marginBottom: "0", overflow: "hidden", fontSize: "16px", textAlign: "center",
        color: "rgba(0, 0, 0, 0.85)", fontWeight: 500, whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
        { text }
      </p>
    )
  }
  function cardDesc(text) {
    return (
      <p style={{ height: "24.8px", marginBottom: "0", overflow: "hidden", fontSize: "14px", textAlign: "center",
        color: "rgba(0, 0, 0, 0.45)", fontWeight: 400, whiteSpace: "nowrap", textOverflow: "ellipsis", position: "relative", top: "-8px" }}>
        { text }
      </p>
    )
  }

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <div align="center" style={{ paddingTop: 15 }}>
          <Avatar size={80} icon={<UserOutlined />} />
        </div>
      }
      actions={[
        <Tooltip placement="bottom" title="Setting"><Link to=""><SettingOutlined key="settings" /></Link></Tooltip>,
        <Tooltip placement="bottom" title="Development"><Link to="/development"><ExperimentOutlined key="experiment" /></Link></Tooltip>,
        <Tooltip placement="bottom" title="Log out"><a href="/accounts/logout"><LogoutOutlined key="logout" /></a></Tooltip>,
      ]}
      bodyStyle={{ paddingTop: "15px", paddingLeft: "15px", paddingRight: "15px", paddingBottom: "7px" }}
    >
      <Meta
        title={cardTitle("testuser13")}
        description={cardDesc("testuser13@localhost.com")}
      />
    </Card>
  )
}

export default ProfileCard;