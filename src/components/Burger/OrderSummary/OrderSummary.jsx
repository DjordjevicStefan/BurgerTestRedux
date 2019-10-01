import React from "react";

import Auxe from "../../../hoc/Auxe";

import Buttons from "../../Ui/Button/Buttons" 

export default function OrderSummary(props) {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => (
    <li key={igKey}>
      <span style={{ fontWeight: "600" }}>{igKey}: </span> 
      {props.ingredients[igKey]}
    </li>
  ));
  return (
    <Auxe>
      <h3>Your order list:</h3>
      <ul>{ingredientSummary}</ul>
      <p style={{ fontWeight: "600" }}>Total order price: {props.totalPrice.toFixed(2)}</p>
      <p>Continue to checkout ?</p>
      <Buttons clicked={props.cancelOrder} btnType="Danger">CANCEL</Buttons>
      <Buttons  clicked={props.continuedOrder}  btnType="Success">ORDER NOW</Buttons>
    </Auxe>
  );
}
