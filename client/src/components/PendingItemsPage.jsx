import React, { useState, useEffect } from "react";
import { PendingItem } from "./PendingItem.jsx";

export const PendingItemsPage = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    if (!items) {
      fetch("http://localhost:5000/api/items?status=pending")
        .then(response => {
          return response.json();
        })
        .then(data => {
          setItems(data.items);
        });
    }
  }, [items]);

  return (
    <div>
      <div className="row justify-content-center search-container">
        <form className="form-inline search-form">
          <input type="text" />
          <button type="submit">Search</button>
        </form>
      </div>
      <h1>Items:</h1>
      {items ? (
        <>
          {items.map((item, index) => (
            <PendingItem iteminfo={item} key={index} />
          ))}
        </>
      ) : null}
    </div>
  );
};
