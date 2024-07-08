import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Add = () => {
  const [productID, setProductID] = useState("");
  const [image, setImage] = useState(null); // State to store base64 image
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [price, setPrice] = useState("");
  const [isADDIn, setIsADDIn] = useState(false);

  // Function to handle file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Set the base64 string as the image state
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file); // This triggers reader.onloadend
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare request data with base64 image
    const requestData = {
      EventID: "1003",
      addInfo: {
        ProductId: productID,
        Image: image, // Base64 image string
        ProductName: productName,
        ProductDescription: productDescription,
        ProductCategory: productCategory,
        Price: price,
      },
    };

    try {
      const response = await fetch("http://localhost:5167/addItems", {
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
        alert(data.rMessage || "Added Successfully!");
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
        <h4>ADD FOOD IN HOME PAGES</h4>

        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          

          <label htmlFor="image">
            {/* Render preview of uploaded image */}
            {image && (
              <img
                src={image}
                alt="Uploaded"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileInputChange}
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
            // required
          />

          <p>Product Name</p>

          <input
            type="text"
            name="productName"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Type here"
            required
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
            required
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
              required
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
              required
            />
          </div>
         
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
        <br />
        {/* <Link to="/delete">
      <h5>CLICK HERE FOR DELET</h5>
      </Link> */}
      </form>
      <hr />
    </>
  );
};

export default Add;
