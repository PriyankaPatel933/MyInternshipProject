import React, { useState } from "react";
import { assets } from "../assets/assets/assets";
import { Link, Navigate,useNavigate  } from "react-router-dom";
const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 


  const handleLogin = async (e) => {
    e.preventDefault();

    const requestData = {
      EventID: "1002",
      addInfo: {
        EMAIL_ID: email,
        Password: password,
      },
    };
    try {
      const response = await fetch("http://localhost:5167/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log(data, "Api response data");

      if (response.ok && data.rData.rCode === 0) {
        setIsLoggedIn(true);
        alert(data.rData.rMessage || "Login Successfully!");
        
      } else {
        alert(data.rData.rMessage || "Invalid Credentials!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while trying to log in.");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form className="login-popuo-container" onSubmit={handleLogin}>
        <div className="login-popuo-title">
          <br />
          <h4>LogIn</h4>
          
          <img onClick={() => navigate('/')} src={assets.cross_icon} alt="" />        </div>
        <div className="login-popup-inpputs">
          <input
            type="text"
            placeholder="Enter Your Email "
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Enter Your Password "
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button>LogIn</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing,I agree to the terms of use & privacy policy.</p>
        </div>

        <p>
          Create New Account? <Link to="/SignIn">SignIn Here</Link>{" "}
        </p>
      </form>
    </>
  );
};

export default LogIn;
