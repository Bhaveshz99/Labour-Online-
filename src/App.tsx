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

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='' element={<HomeScreen />} />
        <Route path='services-list' element={<ServiceListPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
