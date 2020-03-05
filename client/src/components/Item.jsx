import React from "react";

export const Item = props => {
  console.log(props);
  return (
    <div className="card">
      <h3>Product's name: {props.iteminfo.name}</h3>
      <h4>Product's price: {props.iteminfo.price}</h4>
      <button>Buy</button>
    </div>
  );
};
