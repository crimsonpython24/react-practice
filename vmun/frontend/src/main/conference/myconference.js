import React, { useState, useEffect } from 'react';

import "antd/dist/antd.css";
import { Button } from 'antd';
import { Switch, Route, Link } from "react-router-dom";


function fetchData(url, met, data=null) {
  return fetch(url, {
    method: met,
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      'X-Requested-With': 'XMLHttpRequest'
    }
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

function getConfs() {
  return fetchData('http://127.0.0.1:8000/api/confs/?format=json', 'GET')
}

function ConferenceHome() {
  const [confs, setConfs] = useState([]);

  useEffect(() => {
    getConfs().then(x => setConfs(x));
  }, []);

  return (
    <div style={{ paddingLeft: 30, paddingTop: 30 }}>
      <Link to="/conference/add" key="add"><Button type="primary">Add Conference</Button></Link>
      <div style={{ height: 20 }}></div>
      <ol>
        {confs.map((conf, index) => (
          <li key={index}>({conf.id}) {conf.title} at {conf.date_start}
            <Link to={`/conference/${conf.slug}`}>Link</Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ConferenceHome;
