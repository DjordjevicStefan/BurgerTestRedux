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
  localStorage.removeItem("token") ;
  localStorage.removeItem("expirationDate") ;
  localStorage.removeItem("userId") ;


  return {
    type : actionTypes.AUTH_LOGOUT
  }
}

export const setAuthRedirectPath = (path) => {
   return {
     type : actionTypes.SET_AUTH_REDIRECT_PATH , 
     path  : path
   }
} 


const checkAuthTimeout = (expireTime) => {
  return dispatch => {
    setTimeout(() => {
     dispatch(logout()) ;
    }, parseInt(expireTime)  * 1000);
  }
}



///// ASYNC PART
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

             ///// novi date obj sa dodatim vremenom vazenja tokena iz responsa. 
            let expirationDate = new Date(new Date().getTime()  + (response.data.expiresIn * 1000))  
            
            localStorage.setItem("token" , response.data.idToken ) ;
            localStorage.setItem("expirationDate" ,  expirationDate) ;
            localStorage.setItem("userId" ,  response.data.localId) ;
            
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



////// nije prava asinc funcija. ali ako hocemo vise actionCreatora da dispatchujemo moramo ovako da pisemo
export const authCheckState = () => {
   return dispatch => {
     let token = localStorage.getItem("token") ;
     let userId = localStorage.getItem("userId") ;
     if (!token) {
        dispatch(logout()) ;
     } else {
       /// kada se vadi iz lokal storage date on je tu zabelezen kao string a ne date objekat!!! zato mora opet da ide u konstruktor funkciju da bi dobili date obj !!!
       let expirationDate = new Date(localStorage.getItem("expirationDate")) ;

       //// izloguj se sako je expirationDate prosao
       if (expirationDate < new Date()) {
          dispatch(logout())
       } else {
          
          dispatch(authSuccess(token, userId ))

          /// stavljamo novo vreme za automatski logaout
          dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)) ;
       }

     }
   }
  
}