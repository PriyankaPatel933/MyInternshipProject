import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets/assets';
import "./Navbar.css"
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';


const Navbar = ({setShowLogIn}) => {
  
    const [menu,setMenu]=useState ("home");

    const { getTotalCartAmount}=useContext(StoreContext);

    return (
        <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className='navbar-menu'>
        <ul className="navbar-menu">
                <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active": ""}>HOME</Link>
                <a href='#explore-menu'  onClick={()=>setMenu("menu")} className={menu==="menu"?"active": ""}>MENU</a>
                <a href='#app-download'  onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active": ""}>MOBILE-APP</a>
                <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active": ""}>CONTACT-US</a>
            </ul>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className='navbar-search-icon'>
                <Link to='/cart'><img src={assets.basket_icon} alt=''/></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            <button onClick={()=>setShowLogIn(true)}>Singin</button>
        </div>
       
        
    </div>
    );
}

export default Navbar;
