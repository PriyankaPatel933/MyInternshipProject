import React, { useState } from 'react';
import './FoodCart.css'; 
import { assets } from '../../assets/assets/assets'; 
import { addToCartAPI } from './addToCartApi';
const FoodCart = ({ food, addToCart, removeFromCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = async () => {
    setQuantity(quantity + 1);
    addToCart(food);

    try {
      const response = await addToCartAPI(food);
      if (!response.success) {
        console.error(response.message);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      removeFromCart(food);
    }
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={food.image} alt={food.productName} />
        {quantity > 0 ? (
          <div className="food-item-counter">
            <img
              onClick={handleRemoveFromCart}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{quantity}</p>
            <img onClick={handleAddToCart} src={assets.add_icon_green} alt="Add" />
          </div>
        ) : (
          <img
            className="add"
            onClick={handleAddToCart}
            src={assets.add_icon_white}
            alt="Add"
          />
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{food.productName}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{food.productDescription}</p>
        <p className="food-item-price">Price ${food.price}</p>
      </div>
    </div>
  );
};

export default FoodCart;
