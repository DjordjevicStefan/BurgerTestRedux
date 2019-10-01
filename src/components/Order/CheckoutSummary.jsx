import React from 'react'

import style from "./CheckoutSummary.module.css"

import Burger from "../Burger/Burger" ;
import Buttons from "../Ui/Button/Buttons" ;

function CheckoutSummary(props) {
  return (
    <div className={style.checkoutSummary}>
       <div className={style.burgerWrap}>
           <Burger  ingredients={props.ingredients}  />
       </div>
       <Buttons clicked={props.cancelOrder} btnType="Danger" >Cancel</Buttons> 
       <Buttons  clicked={props.continueOrder} btnType="Success">Continue</Buttons> 
    </div>
  )
}

export default CheckoutSummary
