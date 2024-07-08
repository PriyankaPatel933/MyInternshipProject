import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [tax, setTax] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [isPay, setPay] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    const requestData = {
      EventID: "1002",
      addInfo: {
        Email: email,
        CardNumber: cardNumber,
        ExpairyDate: expiryDate,
        CVV: cvv,
        SubTotal: subTotal,
        Tax: tax,
        TotalAmount: totalAmount,
      },
    };

    console.log("Request Data:", requestData); // Log request data for debugging

    try {
      const response = await fetch("http://localhost:5167/paymentdetails", {
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
        alert(data.rMessage || "Payment Successfully!");
        setPay(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while trying to process the payment.");
    }
  };
  if (isPay == true) {
    return <Navigate to="/myorders" />;
  }

  return (
    <div className="payment-method">
      <h1>PAYMENT DETAILS</h1>
      <form className="payDetails" onSubmit={handlePayment}>
        <h6>Email Address</h6>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <br />
        <h6>Credit Card Number/UPI Pin</h6>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Enter your card number/UPI pin"
          required
        />
        <br />
        <div className="payment-methods">
          <h6>Expiry Date</h6>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            required
          />
          <h6>CVV</h6>
          <input
            type="number"
            id="cvv"
            name="cvv"
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
            placeholder="CVV"
            required
          />
        </div>
        <h6>Cart Total</h6>
        <input
          type="number"
          id="subTotal"
          name="subTotal"
          value={subTotal}
          onChange={(e) => setSubTotal(e.target.value)}
          placeholder="$00.00"
          required
        />
        <br />
        <h6>Tax</h6>
        <input
          type="number"
          id="tax"
          name="tax"
          value={tax}
          onChange={(e) => setTax(e.target.value)}
          placeholder="Tax Amount"
          required
        />
        <br />
        <hr />
        <p>Total Amount</p>
        <input
          type="number"
          id="totalAmount"
          name="totalAmount"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          placeholder="Total Amount"
          required
        />
        <br />
        <button type="submit" className="btna">
          Make Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
