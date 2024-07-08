import React, { useState } from 'react';
import { assets } from '../../../assets/assets/assets';
import "./AppDownload.css"; // Import your CSS file

const AppDownload = () => {
  const [placeholder, setPlaceholder] = useState('Enter your email or phone number');

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'email') {
      setPlaceholder('Enter your email');
    } else if (selectedValue === 'phone') {
      setPlaceholder('Enter your phone number');
    }
  };

  return (
    <div className='app-download' id='app-download'>
      <div className="AppImg">
        <img src="/public/Appp.png" alt="" />
      </div>

      <h4>For Better Experience Download <br/> PizzaGuys App</h4>
      <p>We will send you link, open it on your device to download.</p>

      <label htmlFor="contactMethod">Choose contact method:</label>  
      <select id="contactMethod" onChange={handleSelectChange}>
        <option value="email">Email</option>
        <option value="phone">Phone No</option>
      </select>
  

      <br /><br />

      <input type="text" placeholder={placeholder} />
      <hr/><br/>
      <h3>OR DOWNLOAD FROM HERE</h3>

      <div className="app-download-platforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
};

export default AppDownload;


