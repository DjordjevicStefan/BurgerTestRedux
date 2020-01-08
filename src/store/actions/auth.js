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

const authSuccess = (token , localId) => {
    return {
       type : actionTypes.AUTH_SUCCESS , 
       token : token , 
       userId : localId
    }
}

export const logout = () => {
  console.log("okinuo logout");
  return {
    type : actionTypes.AUTH_LOGOUT
  }
}

///// async part
export const auth = (email, password, isSignup) => {
   return dispatch => {
      dispatch(authStart()); 
      const data = {
        email : email ,
        password : password ,
        returnSecureToken : true
      }
       
      let url  = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA87yYSY1uu2-Ct8HF-PX_n3mQxNBFCfJI" ;

      if (!isSignup) {
         url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA87yYSY1uu2-Ct8HF-PX_n3mQxNBFCfJI"
      }

      axios.post(url , data).then(
        response => {
            console.log("response" , response) ; 
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            /// calling another async action creator function
            dispatch(checkAuthTimeout(response.data.expiresIn)) ;
        }
      ).catch(error => {
        console.log("error" , error) ;
        dispatch(authFail(error.response.data.error))
      })
   }
}

const checkAuthTimeout = (expireTime) => {
   return dispatch => {
     setTimeout(() => {
      dispatch(logout()) ;
     }, parseInt(expireTime)  * 1000);
   }
}