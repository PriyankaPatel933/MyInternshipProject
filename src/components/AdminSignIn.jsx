import React, { useState } from "react";
import { assets } from "../assets/assets/assets";
import { Link, Navigate } from "react-router-dom";

const AdminSignIn = () => {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!adminName.trim()) {
      errors.adminName = "Admin Name is required";
    }
    if (!adminEmail) {
      errors.adminEmail = "Admin Email is required";
    } else if (!/\S+@\S+\.\S+/.test(adminEmail)) {
      errors.adminEmail = "Admin Email is invalid";
    }
    if (!adminPassword) {
      errors.adminPassword = "Admin Password is required";
    } else if (adminPassword.length < 6) {
      errors.adminPassword = "Admin Password must be at least 6 characters";
    } else if (!/[a-z]/.test(adminPassword)) {
      errors.adminPassword =
        "Admin Password must contain at least one lowercase alphabet character";
    } else if (!/[A-Z]/.test(adminPassword)) {
      errors.adminPassword =
        "Admin Password must contain at least one uppercase alphabet character";
    }
    return errors;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const requestData = {
      EventID: "1005",
      addInfo: {
        AdminName: adminName,
        AdminEmail: adminEmail,
        AdminPassword: adminPassword,
      },
    };

    try {
      const response = await fetch("http://localhost:5167/adminSignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log(data, "Api response data");

      if (response.ok && data.rData === 0) {
        alert(data.rMessage || "Invalid Credentials!");
      } else {
        alert(data.rMessage || "SignIn Successfully!");
        setIsSignedIn(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while trying to Sign in.");
    }
  };

  if (isSignedIn) {
    return <Navigate to="/Sidebar" />;
  }

  return (
    <>
      <form className="login-popuo-container" onSubmit={handleSignIn}>
        <div className="login-popuo-title">
          <br />
          <h4>Admin SignIn</h4>
          <Link to="/">
            <img src={assets.cross_icon} alt="" />
          </Link>
        </div>
        <div className="login-popup-inpputs">
          <input
            type="text"
            placeholder="Enter Admin Name"
            id="adminName"
            name="adminName"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            required
          />
          {errors.adminName && <p className="error">{errors.adminName}</p>}
          <br />
          <br />
          <input
            type="text"
            placeholder="Enter Admin Email"
            id="adminEmail"
            name="adminEmail"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            required
          />
          {errors.adminEmail && <p className="error">{errors.adminEmail}</p>}
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
          {errors.adminPassword && <p className="error">{errors.adminPassword}</p>}
        </div>
        <button type="submit">SignIn</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        <p>
          Already Have an Account? <Link to="/Adm">LogIn Here</Link>
        </p>
      </form>
    </>
  );
};

export default AdminSignIn;


