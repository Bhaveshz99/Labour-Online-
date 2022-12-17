import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeScreen from './components/HomePage/HomeScreen';
import ServiceListPage from './components/Collections/ServiceListPage';
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
import ChangePassword from './components/LoginSignup/ChangePassword';
import UserProfile from './components/Userprofile/UserProfile';
import ServicesRequest from './components/ServiceRequest/ServicesRequest';
import Bookings from './components/Bookings/Bookings';
import Page404 from './components/Page404';
import { getTokenPass } from './utils'
import { callGet } from './services/Apis';
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./Redux/slices/authSlice";
import 'antd/dist/antd.css';
import './style/common.scss';
import './App.css';
import './style/responsive.css';
import PrivateRouter from './components/LoginSignup/PrivateRouter';
function App() {

  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.user);

  let hasToken = getTokenPass();
  useEffect(() => {
    if (hasToken && !user) {
      callGet('/user/userDetails').then((res: any) => {
        if (res.status === 200) {
          dispatch(addUser(res?.data.data));
        }
      })
    }
  }, [])
  return (
    <div>
      <Header userData={user} />
      <Routes>
        <Route path='' element={<HomeScreen userData={user} />} />
        <Route path='/service-list/:id' element={<ServiceListPage userData={user} />} />
        <Route path='/profile' element={<PrivateRouter><UserProfile userData={user} /></PrivateRouter>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/change-password' element={<PrivateRouter><ChangePassword userData={user} /></PrivateRouter>} />
        <Route path='/service-requests' element={<PrivateRouter><ServicesRequest userData={user} /></PrivateRouter>} />
        <Route path='/bookings' element={<PrivateRouter><Bookings userData={user} /></PrivateRouter>} />
        <Route path='*' element={<Page404 />} />
      </Routes>
      {hasToken && <Footer />}
    </div>
  );
}

export default App;
