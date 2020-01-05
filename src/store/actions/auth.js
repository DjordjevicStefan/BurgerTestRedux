import * as actionTypes  from "./actionTypes" ;
import axios from "axios" ;


const authStart = () => {
  return {
    type : actionTypes.AUTH_START
  }
}

const authFail = (error) => {
  return {
    type : actionTypes.AUTH_FAIL , 
    error : error 
  }
}

const authSuccess = (authData) => {
    return {
       type : actionTypes.AUTH_SUCCESS , 
       authData : authData
    }
}

///// async part
export const auth = (email, password) => {
   return dispatch => {
      dispatch(authStart()); 
      const data = {
        email : email ,
        password : password ,
        returnSecureToken : true
      }
      axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA87yYSY1uu2-Ct8HF-PX_n3mQxNBFCfJI" , data).then(
        response => {
            console.log("response" , response) ; 
            dispatch(authSuccess(response.data))
        }
      ).catch(error => {
        console.log("error" , error) ;
        dispatch(authFail(error))
      })
   }
}