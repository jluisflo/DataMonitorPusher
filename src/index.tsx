import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import './index.css';
import { Col, Row } from 'antd';

ReactDOM.render(
  <React.StrictMode>
    <Row>
      <Col span={20} offset={2}>
        <App />
      </Col>
    </Row>

  </React.StrictMode>,
  document.getElementById('root')
);