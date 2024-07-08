import React, { useState } from "react";
import { assets } from "../assets/assets/assets";
import { Link, Navigate } from "react-router-dom";

const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const requestData = {
      EventID: "1002",
      addInfo: {
        AdminEmail: adminEmail,
        AdminPassword: adminPassword,
      },
    };

    try {
      const response = await fetch("http://localhost:5167/adminlogIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log(data, "Api response data");

      if (response.ok && data.rData == 0) {
        // setIsLoggedIn(true);
        alert(data.rMessage || "Invalid Credentials!");
      } else {
        alert(data.rMessage || "LogIn Successfully!");
        setIsLoggedIn(true);

      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while trying to log in.");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/Sidebar" />;
  }

  return (
    <>
      <form className="login-popuo-container" onSubmit={handleLogin}>
        <div className="login-popuo-title">
          <br />
          <h4>AdminLogIn</h4>
          <Link to="/">
            <img src={assets.cross_icon} alt="" />
          </Link>
        </div>

        <div className="login-popup-inpputs">
          <input
            type="text"
            placeholder="Enter Admin Email"
            id="adminEmail"
            name="adminEmail"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Enter Admin Password"
            id="adminPassword"
            name="adminPassword"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">LogIn</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        <p>
          Create New Account? <Link to="/AdminSignIn">SignIn Here</Link>
        </p>
      </form>
    </>
  );
};

export default AdminLogin;
