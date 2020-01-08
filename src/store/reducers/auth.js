import * as actionTypes from "../actions/actionTypes" ;

const initialState = {
   loading : false , 
   error : null , 
   token : null , 
   userId : null ,
   authRedirectPath : "/"
   
}

const reducer = (state = initialState , action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state , 
        loading : true
     }

     case actionTypes.AUTH_SUCCESS:
      return {
        ...state , 
        loading : false, 
        error : null , 
        token : action.token , 
        userId : action.userId
     }

     case actionTypes.AUTH_FAIL:
      return {
        ...state , 
        loading : false, 
        error : action.error , 
     } 

     case actionTypes.AUTH_LOGOUT:
      return {
        ...state , 
        token : null , 
        userId : null 
     }

     case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state , 
        authRedirectPath : action.path
     }
      
  }

  return state ;
}


export default reducer ; 