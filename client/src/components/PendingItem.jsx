import React, { useState } from "react";

export const PendingItem = props => {
  const [confirmed, setConfirmed] = useState(false);
  const confirmItem = () => {
    setConfirmed(true);
    fetch(props.iteminfo.links[0].self, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: "listed" })
    }).catch(e => setConfirmed(false));
  };

  if (!confirmed) {
    return (
      <div className="card">
        <h3>Item's name: {props.iteminfo.name}</h3>
        <h4>Item's price: {props.iteminfo.price}</h4>
        <h4>Item's status: {props.iteminfo.status}</h4>
        <p>Item's description: {props.iteminfo.description}</p>
        <button onClick={confirmItem}>Confirm</button>
      </div>
    );
  } else return null;
};
