import React, { useState } from 'react';
import "./Add.css"
import { Navigate } from "react-router-dom";


const DeleteFood = () => {
    const [productID, setProductID] = useState("");
    const [image, setImage] = useState(null); // Use null for file input
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [price, setPrice] = useState("");
    const [isADDIn, setIsADDIn] = useState(false);

  
    const handleSubmit = async (e) => {

    e.preventDefault();

    const requestData = {
      EventID: "1003",
      addInfo: {
        ProductId:productID,
        // Image: image,
        // ProductName: productName,
        // ProductDescription: productDescription,
        // ProductCategory: productCategory,
        // Price: price,
      },
    };
    try {
      const response = await fetch(" http://localhost:5167/deleteItems",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log(data, "Api response data");

      if (response.ok && data.rData == 0) {
        alert(data.rMessage || "Invalid Credentials!");
      } else {
        alert(data.rMessage || "Deleted Successfully!");
        setIsADDIn(true);

      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while trying to Adding New Food.");
    }
  };



  if (isADDIn) {
    return <Navigate to="/Sidebar" />;
  }


    return (
        <>
        <form className="flex" onSubmit={handleSubmit}>
          <h4>DELETE FOOD FROM HOME PAGES</h4>
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            
            <label htmlFor="image">
              {/* <img src="/public/upload_area.png" alt="" /> */}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
  
              // required
            />
          </div>
          <div className="add-product-name flex-col">
  
          
          <p>Product-id</p>
            <input 
            
             type="text"
             id="productID"
             name="productID"
             value={productID}
             onChange={(e) => setProductID(e.target.value)}
  
              required
           />
  
  
            <p>Product Name</p>
            
            <input
              type="text"
              name="productName"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Type here"
            //   required
            />
          </div>
          <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea
              rows="6"
              placeholder="Write Content Here"
              id="productDescription"
              name="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            //   required
            ></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product Category</p>
              <select
                name="productCategory"
                id="productCategory"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                // required
              >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="SandWich">SandWich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product Price</p>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="$20"
                // required
              />
            </div>
          </div>
          <button type="submit" className="add-btn">
            DELETE
          </button>
        </form>
        <hr />
  
  
  
      </>
    
    );
}

export default DeleteFood;
