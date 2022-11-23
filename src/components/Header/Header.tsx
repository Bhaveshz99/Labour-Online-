import React from 'react'
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { NotificationOutlined, SearchOutlined, AppstoreOutlined, BookOutlined, FileUnknownOutlined, UserOutlined } from '@ant-design/icons'
// import Logo from '../../assets/images/man.png'
import './header.scss'
import ImgSrc from '../CommonComponents/ImgSrc';

const Header = () => {
  return (
    <header className='header_wrapper'>
      {window.innerWidth < 768 &&
        <>
          <div className="header_upper">
            <div className='icon_area'>
              <Link to='/'>
                <img src={"./Assets/avatar/avatar1.svg"} />
              </Link>
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
            <Input className='search_service' size='small' placeholder="Search For Services" prefix={<SearchOutlined />} />
          </div>
        </>
      }
      {window.innerWidth > 768 &&
        <>
          <div className='header_upper'>
            <div className='header_left'>
              <Link to='/'>
                <div className='logo'>
                  <ImgSrc src={"./Assets/avatar/avatar1.svg"} />
                </div>
              </Link>
              <div className='search_area'>
                <div className=''>
                  <Input className='search_service' placeholder="Search For Services" prefix={<SearchOutlined />} />
                </div>
              </div>
            </div>
            <div className='header_right'>
              <div className='requests'>
                 <Link to='/service-requests' >
                  <h4>Requests</h4><FileUnknownOutlined />
                 </Link>
              </div>
              <div className='bookings'>
                 <Link to='/bookings' >
                  <h4>Bookings</h4> <BookOutlined />
                 </Link>
              </div>
              {/* <div className='notification_area'>
                 <Link to='/service-requests' >
                  <h4>Bookings</h4> <NotificationOutlined />
                 </Link>
              </div> */}
              <div>
                <Link to='/login'>
                  <label>Login/Signup</label>
                </Link>
              </div>
            </div>
          </div>
        </>
      }
    </header>
  )
}

export default Header