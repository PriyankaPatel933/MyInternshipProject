import React, { useState } from "react";

const AddMenu = () => {
  const [idfoodExploreMenu, setIdfoodExploreMenu] = useState("");
  const [image, setImage] = useState(null); // State to store base64 image
  const [name, setName] = useState("");

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
      EventID: "1005",
      addInfo: {
        idfoodExploreMenu: idfoodExploreMenu,
        Image: image, // Base64 image string
        Name: name,
      },
    };

    try {
      const response = await fetch("http://localhost:5167/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log(data, "API response data");

      if (response.ok && data.rCode === 0) {
        alert(data.rMessage || "gvhhj!");
        // Clear form fields after successful submission
        setIdfoodExploreMenu("");
        setImage(null);
        setName("");
      } else {
        alert(data.rMessage || "Added Successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while trying to add a new menu item.");
    }
  };

  return (
    <>
      <form className="flex" onSubmit={handleSubmit}>
        <h4>ADD Menu IN HOME PAGES</h4>

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
            accept="image/*" // Accept only image files
            required // Make the image upload required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>idfoodExploreMenu</p>
          <input
            type="text"
            id="idfoodExploreMenu"
            name="idfoodExploreMenu"
            value={idfoodExploreMenu}
            onChange={(e) => setIdfoodExploreMenu(e.target.value)}
            required // Make the ID field required
          />

          <p>Product Name</p>

          <input
            type="text"
            name="Name"
            id="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            required // Make the Name field required
          />
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
        <br />
      </form>
      <hr />
    </>
  );
};

export default AddMenu;


