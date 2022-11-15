import React from 'react'
import { Input } from 'antd';
import { NotificationOutlined, SearchOutlined } from '@ant-design/icons'
import Logo from '../../assets/images/man.png'
import './header.scss'

const Header = () => {
  return (
    <div className='header_wrapper'>
      <div className="header_upper">
        <div className='icon_area'>
          <img width={20} height={20} src={Logo} />
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
    </div>
  )
}

export default Header