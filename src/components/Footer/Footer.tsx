import React from 'react'
import { Row, Col } from 'antd'
import { AppstoreOutlined, BookOutlined, FileUnknownOutlined, UserOutlined } from '@ant-design/icons';
import './footer.scss'
const Footer = () => {
  if(window.innerWidth < 768){
    return (
      <div className='footer_wrapper'>
        <Row>
          <Col sm={6} xs={6}>
            <div>
              <AppstoreOutlined />
            </div>
            <label> Home </label>
          </Col>
          <Col sm={6} xs={6}>
            <div>
              <BookOutlined />
            </div>
            <label> Bookings </label>
          </Col>
          <Col sm={6} xs={6}>
            <div>
              <FileUnknownOutlined />
            </div>
  
            <label> Requests </label>
          </Col>
          <Col sm={6} xs={6}>
            <div>
              <UserOutlined />
            </div>
            <label> Profile </label>
          </Col>
        </Row>
      </div>
    )
  }
  return <></>;
}

export default Footer