import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './assets/pages/HOME/Home';
import Cart from './assets/pages/CART/Cart';
import PlaceOrder from './assets/pages/PLACEORDER/PlaceOrder';
import Footer from './components/Navbar/Footer/Footer';
import LogInpoupup from './components/LogInpoupup/LogInpoupup';

const App = () => {

const [showLogIn, setShowLogIn]=useState(false)
  
  return (
    <>
    {showLogIn?<LogInpoupup setShowLogIn={setShowLogIn}/>:<></>}
    <div className='app'>
   <Navbar setShowLogIn={setShowLogIn}/>
   <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/cart' element={<Cart/>}/>
     <Route path='/order' element={<PlaceOrder/>}/>
   </Routes>
    </div>
    <Footer/>
    </>
  );
}

export default App;
