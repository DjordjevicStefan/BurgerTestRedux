import React from 'react'

import styles from "./burger.module.css"

import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient"

export default function Burger(props) {

console.log("ing" , props.ingredients);
  let ingKeys = Object.keys(props.ingredients) ;

console.log("ingKeys" , ingKeys);
  
let ingredientsArray = [];
ingKeys.forEach(ingKey => {
  for(let i = 0; i < props.ingredients[ingKey]; i++)
    ingredientsArray.push(<BurgerIngredient key={ingKey + i} type={ingKey}/>)
});
  
 console.log("i" , ingredientsArray);

if (ingredientsArray.length === 0) {
  ingredientsArray = <p> Please select your ingrediants </p> ;
 }
 
   
 return (
    <div className={styles.Burger}>
        <BurgerIngredient type="bread-top"/>
        {ingredientsArray}
        <BurgerIngredient type="bread-bottom"/>
     </div>
  )
}
