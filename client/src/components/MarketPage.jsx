import React, { useState, useEffect } from "react";
import { Item } from "./Item.jsx";

export const MarketPage = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    if (!items) {
      fetch("/api/items")
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
            <Item iteminfo={item} key={index} />
          ))}
        </>
      ) : null}
    </div>
  );
};
