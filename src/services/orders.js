import axios from "axios" ;


const instance = axios.create({
  baseURL : "https://burger-apk.firebaseio.com/"
})

export function makeOrder(order, token) {
  return instance.post("/orders.json?auth=" + token , order) ;
}

export function getIngredients() {
  return instance.get("https://burger-apk.firebaseio.com/ingredients.json") ;
}

export function getOrders(token) {
  return instance.get("/orders.json?auth=" + token) ;
}

export default instance ;