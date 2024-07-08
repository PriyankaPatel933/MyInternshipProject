import React, { useState } from "react";
// import "./Home.css";
import Header from "../../../components/Navbar/Header/Header";
import ExploreMenu from "../../../components/Navbar/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../../components/Navbar/FoodDisplay/FoodDisplay";
// import AllFoodGal from "../../../components/AllFoodGal/AllFoodGal";
// import FoodDis from './../../../components/AllFoodGal/FoodDis';

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      {/* <AllFoodGal /> */}
      {/* <FoodDis/> */}
    </div>
  );
};

export default Home;
