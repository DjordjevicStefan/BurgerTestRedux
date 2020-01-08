import * as actionTypes from "./actionTypes" ;
import { getIngredients} from "../../services/orders" ; 

export const addIngredient = (name) => {
   return {
     type : actionTypes.ADD_INGREDIENT  ,
     ingName : name
   }
}

export const removeIngredient = (name) => {
  return {
    type : actionTypes.REMOVE_INGREDIENT  ,
    ingName : name
  }
}


const setIngredients = (ing) => {
   return {
      type : actionTypes.SET_INGREDIENTS, 
      ingredients : ing 
   }
}

const fetchIngredientsFailed = (error) => {
  return {
    type : actionTypes.FETCH_INGREDIENTS_FAILED, 
    error : error 
 }
}
 

export const initIngredients = () => {
  return dispatch => {
      
    getIngredients()
     .then( response => {
            // console.log("response data", response.data );
            dispatch(setIngredients(response.data))
           
     } ).catch(error => {
      dispatch(fetchIngredientsFailed(error))   ;
     })

     
  }
}