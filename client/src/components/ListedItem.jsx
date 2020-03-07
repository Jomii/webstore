import React from "react";
import { Link } from "react-router-dom";

export const ListedItem = props => {
  return (
    <div className="card">
      <h3>Item's name: {props.iteminfo.name}</h3>
      <h4>Item's price: {props.iteminfo.price}</h4>
      <h4>Item's status: {props.iteminfo.status}</h4>
      <p>Item's description: {props.iteminfo.description}</p>
      <Link to={"/market/" + props.iteminfo._id}>
        <button>Buy</button>
      </Link>
    </div>
  );
};
