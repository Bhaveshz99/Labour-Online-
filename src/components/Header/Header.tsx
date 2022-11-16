import React from 'react'
import { Input } from 'antd';
import { NotificationOutlined, SearchOutlined, AppstoreOutlined, BookOutlined, FileUnknownOutlined, UserOutlined } from '@ant-design/icons'
import Logo from '../../assets/images/man.png'
import './header.scss'
import ImgSrc from '../CommonComponents/ImgSrc';

const Header = () => {
  return (
    <div className='header_wrapper'>
      {window.innerWidth < 768 &&
        <>
          <div className="header_upper">
            <div className='icon_area'>
              <img src={Logo} />
            </div>
            <div className='location_area'>

              <p>Hi, Raju </p>
              <div className='location'>

              </div>

            </div>
            <div className='notification_area'>
              <div>
                <NotificationOutlined />
              </div>
            </div>
          </div>
          <div className='search_area'>
            <Input size="large" className='search_service' placeholder="Search For Services" prefix={<SearchOutlined />} />
          </div>
        </>
      }
      {window.innerWidth > 768 &&
        <>
          <div className='header_upper'>
            <div className='header_left'>
              <div className='logo'>
                <ImgSrc src={Logo} />
              </div>
              <div className='search_area'>
                <div className=''>
                  <Input size="large" className='search_service' placeholder="Search For Services" prefix={<SearchOutlined />} />
                </div>
              </div>
            </div>
            <div className='header_right'>
              <div className='requests'>
                <FileUnknownOutlined />
              </div>
              <div className='bookings'>
                <BookOutlined />
              </div>
              <div className='notification_area'>
                <NotificationOutlined />
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Header