import React, { useState, useEffect } from 'react';
import './Cart.css';
import { addToCartAPI } from '../../../components/FoodCart/addToCartApi'; // Adjust path as needed

const Cart2 = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const requestData = {
      EventID: "1001",
      addInfo: {},
    };

    try {
      const response = await fetch("http://localhost:5167/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items.");
      }

      const data = await response.json();

      if (data.result && data.result.rData && data.result.rData.rCode === 0) {
        setCartItems(data.result.rData.Foods || []);
      } else {
        throw new Error(data.result.rMessage || "Cart items not found!");
      }
    } catch (error) {
      setError(error.message || "An error occurred while fetching cart items.");
      console.error("Error fetching cart items:", error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const removeResponse = await addToCartAPI({ productId, quantity: 1 });

      if (removeResponse.success) {
        // If successfully removed from cart, fetch updated cart items
        fetchCartItems();
      } else {
        throw new Error(removeResponse.message || "Failed to remove item from cart.");
      }
    } catch (error) {
      setError(error.message || "An error occurred while removing item from cart.");
      console.error("Error removing item from cart:", error);
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.Total, 0);
  };

  if (error) {
    return <div>Error: {error}</div>; // Render error message if there's an error
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Product Name</p>
          <p>Description</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <p>{item.productName}</p>
            <p>{item.productDescription}</p>
            <p>${item.price}</p>
            <p>{item.quantity}</p>
            <p>${item.Total}</p>
            <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</b>
            </div>
          </div>
          <button onClick={() => console.log("Proceed to checkout")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart2;



