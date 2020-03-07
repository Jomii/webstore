import React, { useState, useEffect } from "react";
import { ListedItem } from "./ListedItem.jsx";

export const MarketPage = () => {
  const [items, setItems] = useState();
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState();

  useEffect(() => {
    if (!items) {
      fetch("http://localhost:5000/api/items?status=listed")
        .then(response => {
          return response.json();
        })
        .then(data => {
          setItems(data.items);
          setFilteredItems(data.items);
        });
    }
  }, [items, filteredItems]);

  const filterItems = e => {
    e.preventDefault();
    let tempItems = [];

    for (let item of items) {
      if (item.name.includes(query)) tempItems.push(item);
    }
    setFilteredItems(tempItems);
    setQuery("");
  };

  return (
    <div>
      <div className="row justify-content-center search-container">
        <form className="form-inline search-form">
          <input value={query} onChange={e => setQuery(e.target.value)} />
          <button type="submit" onClick={filterItems}>
            Search
          </button>
        </form>
      </div>
      <h1>Items:</h1>
      {filteredItems ? (
        <>
          {filteredItems.map((item, index) => (
            <ListedItem iteminfo={item} key={index} />
          ))}
        </>
      ) : null}
    </div>
  );
};
