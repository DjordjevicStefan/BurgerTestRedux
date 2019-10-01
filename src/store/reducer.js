import * as actionTypes from "./actions" ;

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  } ,
  totalPrice: 1,
}


const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 1.4,
  cheese: 1,
  meat: 2.4
};

const reducer = (state = initialState, action ) => {
    switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
        

      return {
        ...state ,
        ingredients : {
          ...state.ingredients , 
          [action.ingName] : state.ingredients[action.ingName] + 1     
        } ,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingName]
      }

      case actionTypes.REMOVE_INGREDIENT:
        

      return {
        ...state ,
        ingredients : {
          ...state.ingredients , 
          [action.ingName] : state.ingredients[action.ingName] - 1     
        } ,
        totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingName]
      }
        
    }
   return state ;
}


export default reducer ;