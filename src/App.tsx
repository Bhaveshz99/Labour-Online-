import React from 'react';
import {
  Route,
  Routes
} from "react-router-dom";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeScreen from './components/HomePage/HomeScreen';

import 'antd/dist/antd.css';
import './style/common.scss';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='' element={<HomeScreen />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
