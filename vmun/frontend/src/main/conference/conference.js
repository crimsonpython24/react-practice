import React, { useContext } from 'react';

import "antd/dist/antd.css";

import { useParams } from "react-router-dom";

function Conference() {
  let { confId } = useParams();
  return <h3>Conference {confId}</h3>
}

export default Conference;
