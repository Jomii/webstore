import React, { useState, useEffect } from "react";

export const ItemsPage = () => {
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
      <h1>Items:</h1>
      {items ? (
        <>
          {items.map((item, index) => (
            <p key={index}>
              Item's name: {item.name}, item's price: {item.price}
            </p>
          ))}
        </>
      ) : null}
    </div>
  );
};
