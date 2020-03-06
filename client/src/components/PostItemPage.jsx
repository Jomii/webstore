import React, { useState } from "react";

export const PostItemPage = () => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const postItem = e => {
    e.preventDefault();
    const item = {
      name: itemName,
      price: itemPrice,
      description: itemDescription
    };
    fetch("/api/items", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    })
      .then(() => {
        setItemName("");
        setItemPrice("");
        setItemDescription("");
      })
      .catch(e => console.log("failed"));
  };

  return (
    <form onSubmit={postItem}>
      <div className="form-group">
        <label>Name</label>
        <input
          className="form-control"
          placeholder="Enter item name"
          value={itemName}
          onChange={e => setItemName(e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          className="form-control"
          type="number"
          placeholder="Enter item price"
          value={itemPrice}
          onChange={e => setItemPrice(e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label placeholder="Enter item description">Description</label>
        <textarea
          className="form-control"
          rows="3"
          value={itemDescription}
          onChange={e => setItemDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
