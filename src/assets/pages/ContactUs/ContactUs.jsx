import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Cn.css";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [messages, setMessages] = useState("");
  const [isContactUs, setContactUs] = useState(false);

  const contact = async (e) => {
    e.preventDefault();

    const requestData = {
      EventID: "1002",
      addInfo: {
        Name: name,
        Email: email,
        PhoneNo: phoneNo,
        Messages: messages,
      },
    };

    try {
      const response = await fetch("http://localhost:5167/contactUs", {
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
        alert(data.rMessage || "FeedBack Added Successfully!");
        setContactUs(true);

      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while trying to process the feedback.");
    }
  };
  if (isContactUs == true) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form className="frm" onSubmit={contact}>
        <h3>CONTACT US</h3>

        <input
          list="categories"
          name="category"
          placeholder="How Can I Help You"
       
        />
        <datalist id="categories">
          <option value="I need help with my PizzGuys online order." />
          <option value="I found incorrect/outdated information on a page." />
          <option value="There is a photo/review that is bothering me and I would like to report it." />
          <option value="The website/app are not working the way they should." />
        </datalist>
        <br />
        <br />
        <input
          type="text"
          placeholder="Enter Your Name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="email"
          placeholder="Enter Your Email Address"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="number"
          placeholder="Enter Your Phone No (Optional)"
          id="phoneNo"
          name="phoneNo"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <br />
        <br />
        <textarea
          placeholder="Your Message"
          rows="5"
          cols="25"
          id="messages"
          name="messages"
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          required
        ></textarea>
        <br />
        <br />
        <button className="bt" type="submit">
          Submit Feedback
        </button>
      </form>
    </>
  );
};

export default ContactUs;

