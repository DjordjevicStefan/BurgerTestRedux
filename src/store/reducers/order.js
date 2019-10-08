import * as actionTypes from "../actions/actionTypes" ;

const initialState = {
  loading : false , 
  orders : [] ,
  error : null, 
  finished : false 
}

const reducer = (state = initialState , action) => {
    
   switch (action.type) {
     case actionTypes.PURCHASE_BURGER_START:
       
      return {
        ...state ,
        loading : true, 
        finished: false
      }

      case actionTypes.PURCHASE_BURGER_SUCCESS :
        let newOrder = {
          ...action.orderData ,
          id : action.id
        }
        return  {
          ...state ,
          //// moze ovako da se dodaje order ali nam to realno ne treba jer imamo poziv u bazu za sve ordere!!!
          orders : state.orders.concat(newOrder) ,
          loading : false, 
          finished : true 
        }

        case actionTypes.PURCHASE_BURGER_FAIL :
        return  {
          ...state ,
          loading : false, 
          error : action.error
        }
   
     default:
       return state ;
   }
   
}

export default reducer ; 