import axios from "axios" ;


const instance = axios.create({
  baseURL : "https://burger-apk.firebaseio.com/"
})

export function makeOrder(order) {
  return instance.post("/orders.json" , order) ;
}

export function getIngredients() {
  return instance.get("https://burger-apk.firebaseio.com/ingredients.json") ;
}

export function getOrders() {
  return instance.get("/orders.json") ;
}

export default instance ;