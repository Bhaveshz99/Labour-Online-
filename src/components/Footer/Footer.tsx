import React from 'react'
import { Row, Col } from 'antd'
import { Link, useLocation } from 'react-router-dom';
import { AppstoreOutlined, BookOutlined, FileUnknownOutlined, UserOutlined } from '@ant-design/icons';
import './footer.scss'
const Footer = () => {
  let location = useLocation()
  if (window.innerWidth < 768) {
    return (
      <footer className='footer_wrapper'>
        <nav>
          <Row>
            <Col sm={6} xs={6}>
              <Link to='/'>
                <div className={`nav ${location.pathname === '/' ? 'active' : ''}`}>
                  <div>
                    <AppstoreOutlined />
                  </div>
                  <label> Home </label>
                </div>
              </Link>
            </Col>
            <Col sm={6} xs={6}>
              <Link to='/bookings'>
                <div className={`nav ${location.pathname === '/bookings' ? 'active' : ''}`}>
                  <div>
                    <BookOutlined />
                  </div>
                  <label> Bookings </label>
                </div>
              </Link>
            </Col>
            <Col sm={6} xs={6}>
              <Link to='/service-requests'>
                <div className={`nav ${location.pathname === '/service-requests' ? 'active' : ''}`}>
                  <div>

                    <FileUnknownOutlined />
                  </div>
                  <label> Requests </label>
                </div>
              </Link>
            </Col>
            <Col sm={6} xs={6}>
              <Link to='/profile'>
                <div className={`nav ${location.pathname === '/profile' ? 'active' : ''}`}>
                  <div>
                    <UserOutlined />
                  </div>
                  <label> Profile </label>
                </div>
              </Link>
            </Col>
          </Row>
        </nav>
      </footer>
    )
  }
  return <></>;
}

export default Footer