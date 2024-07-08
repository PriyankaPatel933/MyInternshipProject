import React, { useState, useEffect, useContext } from "react";
import { assets } from "../../assets/assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const AllFoodGal = () => {
  const [foodsList, setFoodsList] = useState([]);
  const [error, setError] = useState(null); // State to track errors

  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    const requestData = {
      EventID: "1099",
      addInfo: {
        idfoodDisplay: "",
        image: "",
        name: "",
        description: "",
        price: "",
      },
    };

    try {
      const response = await fetch("http://localhost:5167/getAllFoodsItems", {
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
        const foods = data.result.rData.foods.map(food => ({
          ...food,
          image: food.image.replace("C:\\Users\\priyanka.patel\\Desktop\\MyProject\\food_del\\src\\assets\\assets\\", "/assets/") 
        }));
        setFoodsList(foods || []);
      } else {
        throw new Error(data.result.rMessage || "Foods not found!!");
      }
    } catch (error) {
      setError(error.message || "An error occurred while trying to fetch foods.");
      console.error("Error fetching foods:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>; 
  }

  const handleAddToCart = (idfoodDisplay) => {
    addToCart(idfoodDisplay); 
  };

  const handleRemoveFromCart = (idfoodDisplay) => {
    removeFromCart(idfoodDisplay); 
  };

  return (
    <div className="container">
      <h2 className="text-info text-start mx-3 my-3">All Foods</h2>
      <div className="row">
        {foodsList.map((food, index) => (
          <div key={food.idfoodDisplay || index + 1} className="col-md-4 mb-4">
            <div className="card">
              <img src={food.image} className="card-img-top" alt={food.name} />
              <div className="card-body">
                <h5 className="card-title">{food.name}</h5>
                <p className="card-text">{food.description}</p>
                <p className="card-text">${food.price}</p>
                {!cartItems[food.idfoodDisplay] ? (
                  <img
                    className="add"
                    onClick={() => handleAddToCart(food.idfoodDisplay)}
                    src={assets.add_icon_white}
                    alt="Add to Cart"
                  />
                ) : (
                  <div className="food-item-counter">
                    <img
                      onClick={() => handleRemoveFromCart(food.idfoodDisplay)}
                      src={assets.remove_icon_red}
                      alt="Remove from Cart"
                    />
                    <p>{cartItems[food.idfoodDisplay]}</p>
                    <img
                      onClick={() => handleAddToCart(food.idfoodDisplay)}
                      src={assets.add_icon_green}
                      alt="Add to Cart"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFoodGal;
