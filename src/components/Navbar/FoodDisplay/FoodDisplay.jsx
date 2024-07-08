import React, { useContext } from 'react';
import "./FoodDisplay.css";
import { StoreContext } from '../../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';



const FoodDisplay = ({category}) => {



    const {food_list} = useContext(StoreContext)


    const backToTop = ()=>{
        window.scrollTo({top:0,left:0, behavior:"smooth"});
    }

    return (
        <div className='food-display' id='food-display'>
            <h2 onClick={backToTop}>Top Dishes neare you</h2>
            <div className="food-display-list">
                {food_list.map((item, index)=>{
                    if (category==="All" || category===item.category) {
                  
              return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                    }  
            })}
            </div>
        </div>
    );
}

export default FoodDisplay;
