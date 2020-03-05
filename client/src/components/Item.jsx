import React from "react";

export const Item = props => {
  return (
    <div className="card">
      <h3>Product's name: {props.name}</h3>
      <h4>Product's price: {props.price}</h4>
      <button>Buy</button>
    </div>
  );
};
