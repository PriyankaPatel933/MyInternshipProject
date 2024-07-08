import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("");
    navigate("/");
  };

  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img src={assets.logo2} alt="" className="logo" />
        </Link>
        {/* <ul className='navbar-menu'> */}
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            HOME
          </Link>

          <Link to="/FoodDis">
            <a
              href="#explore-menu"
              onClick={() => setMenu("menu")}
              className={menu === "menu" ? "active" : ""}
            >
              MENU
            </a>
          </Link>

          <Link to="appDownload">
            <a
              href="#app-download"
              onClick={() => setMenu("mobile-app")}
              className={menu === "mobile-app" ? "active" : ""}
            >
              MOBILE-APP
            </a>
          </Link>

          <Link to="contact-us">
            <a
              href="#app-download"
              onClick={() => setMenu("contact-us")}
              className={menu === "contact-us" ? "active" : ""}
            >
              Contact-Us
            </a>
          </Link>

          <Link to="cart2">
            <a
              href="#app-download"
              onClick={() => setMenu("MyCart")}
              className={menu === "MyCart" ? "active" : ""}
            >
              MyCart
            </a>
          </Link>
        </ul>
        {/* </ul> */}
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />

          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>

          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li>
                <img
                  onClick={() => navigate("/AdminSignIn")}
                  src="/public/user-1024.webp"
                  alt=""
                />
                Admin
              </li>
              <hr />
              <li>
                <img
                  onClick={() => navigate("/SignIn")}
                  src="/public/th (1).jpg"
                  alt=""
                />
                User
              </li>
              <hr />
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr />
    </>
  );
};

export default Navbar;
