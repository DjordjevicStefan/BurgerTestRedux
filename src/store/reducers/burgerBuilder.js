import * as actionTypes from "../actions/actionTypes" ;

const initialState = {
  ingredients: null,
  totalPrice: 1,
  error : false, 
  loading : true
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

      case actionTypes.SET_INGREDIENTS: 
       
       return {
          ...state , 
          loading : false , 
          error : false ,
          ingredients : action.ingredients, 
          totalPrice : 1
       }

       case actionTypes.FETCH_INGREDIENTS_FAILED: 
       
       return {
          ...state , 
          loading : false , 
          error : action.error
       }
        
    }
   return state ;
}


export default reducer ;