import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ConfirmationPage = () => {
  const [item, setItem] = useState();

  useEffect(() => {
    console.log("fetch item from db?");
    setItem("item info");
  }, [item]);

  let { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>Confirmation page for item: {id}</h1>
      <p>{item}</p>
    </div>
  );
};
