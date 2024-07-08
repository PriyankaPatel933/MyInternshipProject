import React, { useState, useEffect } from "react";
import "./FoodDis.css";
// import FoodCart from '../FoodCart/FoodCart';
import FoodCart from "../FoodCart/FoodCart";
const FoodDis = () => {
  const [foodsList, setFoodsList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    const requestData = {
      EventID: "1003",
      addInfo: {},
    };

    try {
      const response = await fetch("http://localhost:5167/getAllItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch foods. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response data:", data);

      if (data.result && data.result.rData && data.result.rData.rCode === 0) {
        setFoodsList(data.result.rData.Foods || []);
        setError(null);
      } else {
        throw new Error(data.result.rMessage || "Foods not found!!");
      }
    } catch (error) {
      setError(
        error.message || "An error occurred while trying to fetch foods."
      );
      console.error("Error fetching foods:", error);
    }
  };

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes For You Order Now</h2>
      <div className="food-display-list">
        {error && <div className="error-message">Error: {error}</div>}
        {foodsList.map((food, index) => (
          <FoodCart key={index} food={food} />
        ))}
      </div>
    </div>
  );
};

export default FoodDis;










