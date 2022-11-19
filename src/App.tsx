import React from 'react';
import {
  Route,
  Routes
} from "react-router-dom";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeScreen from './components/HomePage/HomeScreen';
import ServiceListPage from './components/Collections/ServiceListPage';

import 'antd/dist/antd.css';
import './style/common.scss';
import './App.css'
import UserProfile from './components/Userprofile/UserProfile';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='' element={<HomeScreen />} />
        <Route path='/service-list' element={<ServiceListPage />} />
        <Route path='/profile' element={<UserProfile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
