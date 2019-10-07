import React, { Component } from "react";

import styles from "./ContactData.module.css";
import axios from "../../../services/orders";
import { makeOrder } from "../../../services/orders";
import {connect} from "react-redux"; 

import  withErrorHandler  from "../../../hoc/withErrorHandler/withErrorHandler"

import * as contacDataActionCreators from "../../../store/actions/allActions" ;

import Buttons from "../../../components/Ui/Button/Buttons";
import Spinner from "../../../components/Ui/Spinner/Spinner";
import Input from "../../../components/Ui/Input/Input";

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "" ,
        validation : {
          requred : true 
        } ,
        valid : false,
        touched : false 
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "" ,
        validation : {
          requred : true 
        } ,
        valid : false, 
        touched : false 
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "" ,
        validation : {
          requred : true ,
          minLength : 5 ,
          maxLength : 5
        } ,
        valid : false, 
        touched : false 
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "" ,
        validation : {
          requred : true 
        } ,
        valid : false, 
        touched : false 
      } ,
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fast", displayValue: "Fast" },
            { value: "slow", displayValue: "Slow" }
          ]
        },
        value: "fast" ,
        validation : {} ,
        valid : true
      }
    },
    
    formValid : false 
  };

  handleOrder = e => {
    e.preventDefault();
    

    let formData = {} 
    for (const name in this.state.orderForm) {
        /////// pravimo novi objekat koji ce se sadrzati samo od key value pars !!!!!!
        formData[name] = this.state.orderForm[name].value ;
        
      }
    
      

    const order = {
      ingredients: this.props.ing,
      price: this.props.tprice,
      formData : formData 
    };
    
    this.props.onOrder(order) ;
   
    // makeOrder(order)
    //   .then(res => {
    //     console.log("order submit", res);
    //     this.setState({ loading: false });
    //     this.props.history.replace("/");
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({ loading: false });
    //   });
  };

  checkValidity (value, rules) {
    let isValid = true ;
     
    if (rules.requred) {
      isValid = value.trim() !== "" ;
    } 

    if (rules.requred && rules.minLength) {
      isValid = value.length >= rules.minLength && isValid ;
    } 

    if (rules.requred && rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid ;
    } 

    return isValid ;
  }

  handleChanged =(event, name) => {
    /// deep cloning obj that has an object in him !!!! can't use only ... !!! 
    /// ovde u zavisnosti od inputa koga diramo handlujemo samo taj input i dodeljujemo mu vrednost koja je upisana u state. sve dinamicno. Naravno prvo pre toga mora duplo kopiranje objekta da ne bi zeznuli state objekat. 
    const updatedOrderForm = {...this.state.orderForm} ;
    const deepObjCopy = {...updatedOrderForm[name]} ;
    deepObjCopy.value = event.target.value ;
     
    deepObjCopy.valid = this.checkValidity(deepObjCopy.value, deepObjCopy.validation)
    
    /// da svi u startu ne bi bili crveni validaciju samo krecemo kada se element dodirne, u tom slucaju je jedino moguce dodati klasu Invalid u input polju ako se svi tamo kondicionali potrefe. 
    deepObjCopy.touched = true ; 
    
    //// testiramo da li je cela forma true da bi mogli da stavimo da li da dugme za submit bude dostupno ili ne. Zanimljiv deo koda !!! 
    let formIsValid = true ;
    for (const inputEl in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputEl].valid &&  formIsValid ;
    }
    
    updatedOrderForm[name] = deepObjCopy ;
    this.setState({
       orderForm : updatedOrderForm , 
       formValid : formIsValid
    })

  }

  render() {
    let formElementArrey = [];
    for (const key in this.state.orderForm) {
      formElementArrey.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = null;
    if (this.props.loading) {
      form = <Spinner />;
    } else {
      form = (
        <form onSubmit={this.handleOrder}>
          {/* <input className={styles.Input} type="email" name="email" placeholder="Your email"/>
      <input className={styles.Input} type="text" name="name" placeholder="Your name"/>
      <input className={styles.Input} type="text" name="street" placeholder="Street"/>
      <input className={styles.Input} type="text" name="postal" placeholder="Postal code"/> */}
          {formElementArrey.map(input => {
          return  (<Input
              key={input.id}
              inputName={input.id}
              elementType={input.config.elementType}
              valid={input.config.valid}
              touched={input.config.touched}
              validation={input.config.validation}
              value={input.config.value}
              elementConfig={input.config.elementConfig}
              changed={(event) => this.handleChanged(event, input.id)}
            />)
          })}
          <Buttons disabled={!this.state.formValid} btnType="Success">
            Order  
          </Buttons>
        </form>
      );
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    ing : state.burgerBuilder.ingredients,
    tprice : state.burgerBuilder.totalPrice, 
    loading : state.orders.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrder : (orderData) => dispatch(contacDataActionCreators.purshaseBurger(orderData)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))  ;
