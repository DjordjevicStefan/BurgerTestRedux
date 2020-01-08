import * as actionTypes  from "./actionTypes" ;

import {makeOrder, getOrders } from "../../services/orders" ;


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


export const purshaseBurger = (orderData, token) => {
    return dispatch => {
      dispatch(purchaseBurgerStart())  
      makeOrder(orderData, token)
      .then(res => {
         dispatch(purchaseBurgerSuccess( orderData , res.data));
      })
      .catch(error => {
       dispatch(purchaseBurgerFail(error));
      });
    }
}

// const fetchOrdersStart = () => {
//   return {
//     type : actionTypes.FETCH_ORDERS_START
//   }
// }

const fetchOrdersSuccess = (ordersArr) => {
    return {
      type : actionTypes.FETCH_ORDERS_SUCCESS,
      orders : ordersArr
    }
}

const fetchOrdersFail = (err) => {
  return {
    type : actionTypes.PURCHASE_BURGER_FAIL,
    error : err
  }
}

export const fetchOrders = (token) => {
  return dispatch => {
    //  dispatch(fetchOrdersStart())
      
     getOrders(token)
     .then(res => {
       
       let ordersArr = [];
       for (const order in res.data) {
         ordersArr.push({ ...res.data[order], key: order });
       }
       dispatch(fetchOrdersSuccess(ordersArr));
      
     })
     .catch(err => {
        dispatch(fetchOrdersFail(err))
     });
  }
}