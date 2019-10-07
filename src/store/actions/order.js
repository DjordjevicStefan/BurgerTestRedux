import * as actionTypes  from "./actionTypes" ;

import {makeOrder} from "../../services/orders" ;


export const purchaseBurgerStart = () => {
  return {
    type : actionTypes.PURCHASE_BURGER_START 
  }
}


const purchaseBurgerSuccess = (orderData, resData) => {
  return {
    type : actionTypes.PURCHASE_BURGER_SUCCESS ,
    orderData : orderData,
    id : resData.name
   }
}

const purchaseBurgerFail = (error) => {
  return {
    type : actionTypes.PURCHASE_BURGER_FAIL ,
    error : error
  }
}


export const purshaseBurger = (orderData) => {
    return dispatch => {
      dispatch(purchaseBurgerStart())  
      makeOrder(orderData)
      .then(res => {
         dispatch(purchaseBurgerSuccess( orderData , res.data));
      })
      .catch(error => {
       dispatch(purchaseBurgerFail(error));
      });
    }
}