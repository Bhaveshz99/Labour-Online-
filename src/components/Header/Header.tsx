import React from 'react'
import { Input, Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationOutlined, SearchOutlined, AppstoreOutlined, BookOutlined, FileUnknownOutlined, UserOutlined, PoweroffOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd';
import './header.scss'
import ImgSrc from '../CommonComponents/ImgSrc';
import { getTokenPass, successToast } from '../../utils';
import { UserProps } from '../../interfaces/user'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../Redux/slices/authSlice'
const Header: React.FC<UserProps> = (props: UserProps) => {
  const naviagte = useNavigate()
  let hasToken = getTokenPass()
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.user[0]);

  let token = localStorage.getItem('token');

  const onLogout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    naviagte('/login')
    dispatch(deleteUser({ id: user?._id }));
    successToast('User Logged Out')
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <Link to="/profile">
          <Space>
            <UserOutlined /> Profile
          </Space>
        </Link>
      ),
      key: '0',
    },
    {
      type: 'divider',
    }, {
      label: (
        <Link to="/login" onClick={onLogout}>
          <Space>
            <LogoutOutlined />
            Sign out
          </Space>
        </Link>
      ),
      key: '1',
    }

  ]

  return (
    <header className='header_wrapper'>
      {window.innerWidth < 768 &&
        <>
          <div className="header_upper">
            <div className='icon_area'>
              <Link to='/'>
                <img src={"./Assets/images/logo.svg"} />
              </Link>
            </div>
            <div className='location_area'>

              <p>Hi, {hasToken ? '' : 'Guest'} </p>
              <div className='location'>

              </div>

            </div>
            <div className='notification_area'>
              {/* <div id="change-language"></div> */}
              <div>
                {props.userData ?
                  <PoweroffOutlined className='logout' onClick={onLogout} />
                  : <Link to='/login'> <LoginOutlined /> </Link>
                }
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
                  <ImgSrc src={"./Assets/images/logo.svg"} alt='' />
                </div>
              </Link>
              <div className='search_area'>
                <div className=''>
                  <Input size='small' className='search_service' placeholder="Search For Services" prefix={<SearchOutlined />} />
                </div>
              </div>
            </div>
            <div className='header_right'>
              <div className='requests'>
                {props.userData && <Link to='/service-requests' >
                  <h4>Requests</h4><FileUnknownOutlined />

                </Link>}
              </div>
              <div className='bookings'>
                {props.userData && <Link to='/bookings' >
                  <h4>Bookings</h4> <BookOutlined />
                </Link>}
              </div>
              <div>
                {token ?
                  <Dropdown menu={{ items }} placement="bottom">
                    <PoweroffOutlined className='logout' />
                  </ Dropdown>
                  : <Link to='/login'>
                    <LoginOutlined />
                  </Link>}
              </div>
            </div>
          </div>
        </>
      }
    </header>
  )
}

export default Header