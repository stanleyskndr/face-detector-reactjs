import React, {Component} from "react";
import "./SigninRegister.css";

// Trigger submit button with enter keypress
// var submitBtn = document.querySelector(".signin-register-form button");
// var submitBtn = document.querySelector(".signin-register-form button");

// submitBtn.addEventListener("keypress", (event) => {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     submitBtn.click();
//   }
// });

class Signin extends Component{
    constructor(props){
        super(props);
        this.state={
            inputEmail: "",
            inputPassword: ""
        }
    }

    onEmailChange = (event) =>{
        const inputEmail = event.target.value;
        this.setState({inputEmail: inputEmail});
    }

    onPasswordChange = (event) =>{
        const inputPassword = event.target.value;
        this.setState({inputPassword: inputPassword});
    }

    onSubmitSignin = () =>{
        fetch("https://obscure-ridge-59991.herokuapp.com/signin", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.inputEmail,
                password: this.state.inputPassword
            })
        })
            .then(response => response.json())
            .then(data =>{
                if (data.id){
                    this.props.setUserInSession(data);
                    this.props.onRouteChange("home");
                }else{
                    document.getElementsByClassName("error-msg")[0].innerHTML = data;
                }
            })

        
    }


    render(){
        const {onRouteChange} = this.props;
        return(
            <div>
                <div className="signin-register-container">
                    <div className="signin-register-title">
                        <h1>Welcome Back!</h1>
                        <p>Please sign in to your account.</p>
                    </div>
                    
                    <div className="signin-register-form">
                        <div className="input-group">
                            <label htmlFor="signin-email">EMAIL</label>
                            <input onChange={this.onEmailChange} name="signin-email" type="email" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="signin-password">PASSWORD</label>
                            <input onChange={this.onPasswordChange} name="signin-password" type="password" />
                        </div>
                        <div className="error-msg"></div>
                        <button onClick={this.onSubmitSignin}>Sign in</button>
                    </div>

                    <p className="signin-register-footer">
                        Don't have an account? <span onClick={() => onRouteChange("register")}>Register here</span>.
                    </p>
                </div>
            </div>
        )
    }
}

export default Signin;
