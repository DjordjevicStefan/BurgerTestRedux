import React, { Component } from 'react' ;

import styles from "./Auth.module.css" ; 


import { connect } from "react-redux"
import * as actionCreators from "../../store/actions/allActions"; 


import Input from "../../components/Ui/Input/Input"
import Button from "../../components/Ui/Button/Buttons"

export class Auth extends Component {
  state = {
    controls : {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your mail"
        },
        value: "" ,
        validation : {
          requred : true ,
          isEmail : true
        } ,
        valid : false,
        touched : false 
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "" ,
        validation : {
          requred : true ,
          minLength : 6
        } ,
        valid : false,
        touched : false 
      },
    }
  }


  checkValidity (value, rules) {
    let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
  } 


  handleChanged =(event, name) => {
    /// ovde u zavisnosti od inputa koga diramo handlujemo samo taj input i dodeljujemo mu vrednost koja je upisana u state. sve dinamicno. Naravno prvo pre toga mora duplo kopiranje objekta da ne bi zeznuli state objekat. 
    const updatedAuthForm = {...this.state.controls} ;
    const deepObjCopy = {...updatedAuthForm[name]} ;
    deepObjCopy.value = event.target.value ;
     
    deepObjCopy.valid = this.checkValidity(deepObjCopy.value, deepObjCopy.validation)
    
    /// da svi u startu ne bi bili crveni validaciju samo krecemo kada se element dodirne, u tom slucaju je jedino moguce dodati klasu Invalid u input polju ako se svi tamo kondicionali potrefe. 
    deepObjCopy.touched = true ; 
    
    //// testiramo da li je cela forma true da bi mogli da stavimo da li da dugme za submit bude dostupno ili ne. Zanimljiv deo koda !!! 
    // let formIsValid = true ;
    // for (const inputEl in updatedAuthForm) {
    //   formIsValid = updatedAuthForm[inputEl].valid &&  formIsValid ;
    // }
    
    updatedAuthForm[name] = deepObjCopy ;
    this.setState({
       controls : updatedAuthForm 
    })

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value , this.state.controls.password.value) ; 
  }

  render() {

    let formElementArrey = [];
    for (const key in this.state.controls) {
      formElementArrey.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    
    let form = (
      <form onSubmit={this.handleSubmit}>
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
        <Button btnType="Success">
          Order  
        </Button>
      </form>
    );


    return (
      <div className={styles.Auth}>
        {form}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth : (name, password) => dispatch(actionCreators.auth(name, password))
  }
}

export default connect(null, mapDispatchToProps )(Auth) ;
