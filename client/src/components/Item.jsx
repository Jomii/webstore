import React from "react";
import { Link } from "react-router-dom";

export const Item = props => {
  return (
    <div className="card">
      <h3>Product's name: {props.iteminfo.name}</h3>
      <h4>Product's price: {props.iteminfo.price}</h4>
      <p>Product's id: {props.iteminfo._id}</p>
      <Link to={"/market/" + props.iteminfo._id}>
        <button>Buy</button>
      </Link>
    </div>
  );
};
