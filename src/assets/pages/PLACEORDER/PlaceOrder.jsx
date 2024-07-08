import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../../Context/StoreContext";
import { Link } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Street: "",
    City: "",
    State: "",
    ZipCode: "",
    Country: "",
    PhoneNo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      EventID: "1004", // Adjust EventID as needed
      addInfo: { ...formData },
    };

    try {
      const response = await fetch("http://localhost:5167/deliveryInformation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log("API response data:", data);

      if (response.ok && data.result.rStatus === 0) {
        alert(data.result.rData.rMessage || "Data saved successfully!");
        // Optionally clear the form after successful submission
        setFormData({
          FirstName: "",
          LastName: "",
          Email: "",
          Street: "",
          City: "",
          State: "",
          ZipCode: "",
          Country: "",
          PhoneNo: "",
        });
      } else {
        alert(data.result.rData.rMessage || "Failed to save data!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    }
  };

  

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First Name"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="LastName"
            value={formData.LastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          name="Email"
          value={formData.Email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          placeholder="Street"
          name="Street"
          value={formData.Street}
          onChange={handleInputChange}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="City"
            value={formData.City}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="State"
            value={formData.State}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="multi-fields">
          <input
            type="number"
            placeholder="Zip Code"
            name="ZipCode"
            value={formData.ZipCode}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="Country"
            value={formData.Country}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="tel"
          placeholder="Phone Number"
          name="PhoneNo"
          value={formData.PhoneNo}
          onChange={handleInputChange}
          required
        />
        <div className="btn">
       
        <button type="submit">Save Address</button>
        <button type="submit">Edit Address</button>

          
        </div>
        
        {/* <button type="submit">Edit Address</button> */}

      </div>

      <div className="palace-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <Link to="/Payment">
            <button type="button">PROCEED TO PAYMENT</button>
          </Link>
          
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
