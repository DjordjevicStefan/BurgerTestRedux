import React from 'react'

import styles from "./Order.module.css" 


function Order(props) {
  
  
  let test = [] ;
  for (const x in props.ingredients) {
    test.push(x +"(" + props.ingredients[x] +")") ;
  }
  let finalIng =  test.join(", ");
  
  return (
    <div className={styles.Order}>
      <div>Ingredients: {finalIng}</div>
      <div>Price: {props.price}</div>
    </div>
  )
}


export default Order
