import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { assets } from "./../../assets/assets/assets";

NavLink;
const Sidebar = () => {
  return (
    <>
      {/* <h3>Admin</h3> */}
      <div className="sidebar">
        <div className="sidebar-options">
          <NavLink to="/" className="sidebar-option">
            <img src="/public/parcel_icon.png" alt="" />
            <p>Home</p>
          </NavLink>

          <NavLink to="/allUser" className="sidebar-option">
            <img src="/public/profile_image.png" alt="" />
            <p>All User</p>
          </NavLink>

          <NavLink to="/paymentdetails" className="sidebar-option">
            <img src={assets.bag_icon} alt="" />
            <p>Payments Details</p>
          </NavLink>

          <NavLink to="/delete" className="sidebar-option">
            <img src={assets.remove_icon_red} alt="" />
            <p>Delete Foods</p>
          </NavLink>

          <NavLink to="/add" className="sidebar-option">
            <img src={assets.add_icon_green} alt="" />
            <p>Add Foods</p>
          </NavLink>

          <NavLink to="/menu" className="sidebar-option">
            <img src="/public/add_icon.png" alt="" />
            <p>Add New Menu</p>
          </NavLink>

          <NavLink to="/getFoods" className="sidebar-option">
            <img src="/public/order_icon.png" alt="" />
            <p>Show All Foods</p>
          </NavLink>

          <NavLink to="/myorders" className="sidebar-option">
            <img src="/public/order_icon copy.png" alt="" />
            <p>Orders</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
