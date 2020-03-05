import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ConfirmationPage = () => {
  let { id } = useParams();
  console.log(id);
  return <h1>Confirmation page for item: {id}</h1>;
};
