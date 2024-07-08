
import React, { useEffect, useState } from "react";
import "./List.css";

const GetAllFoods = () => {
  const [foodsList, setFoodsList] = useState([]);
  const [error, setError] = useState(null); // State to track errors

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
        throw new Error("Failed to fetch foods.");
      }

      const data = await response.json();
      console.log("API response data:", data);

      if (data.result && data.result.rData && data.result.rData.rCode === 0) {
        setFoodsList(data.result.rData.Foods || []);
      } else {
        throw new Error(data.result.rMessage || "Foods not found!!");
      }
    } catch (error) {
      setError(error.message || "An error occurred while trying to fetch foods.");
      console.error("Error fetching foods:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>; // Render error message if there's an error
  }

  return (
    <div className="getAllFoods">
      <h2>All Foods List</h2>
      <table className="foods">
        <thead>
          <tr>
            <th>ProductId</th>
            <th>Image</th>
            <th>ProductName</th>
            <th>ProductDescription</th>
            <th>ProductCategory</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {foodsList.map((food, index) => (
            <tr key={index}>
              <td>{food.productId}</td>
              <td>
                <img
                  src={food.image}
                  alt={food.productName}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>{food.productName}</td>
              <td>{food.productDescription}</td>
              <td>{food.productCategory}</td>
              <td>{food.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllFoods;

