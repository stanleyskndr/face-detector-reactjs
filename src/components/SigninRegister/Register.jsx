import React, {Component} from "react";
import "./SigninRegister.css";


class Register extends Component{
    constructor(props){
        super(props);
        this.state= {
            inputEmail: "",
            inputName: "",
            inputPassword: ""
        }
    }

    onEmailChange = (event) =>{
        const inputEmail = event.target.value;
        this.setState({inputEmail: inputEmail});
        
    }

    onNameChange = (event) =>{
        const inputName = event.target.value;
        this.setState({inputName: inputName});
    }

    onPasswordChange = (event) =>{
        const inputPassword = event.target.value;
        this.setState({inputPassword: inputPassword});
    }

    onSubmitRegister = () =>{
        fetch("https://obscure-ridge-59991.herokuapp.com/register", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.inputEmail,
                password: this.state.inputPassword,
                name: this.state.inputName
            })
        })
            .then(response => response.json())
            .then(data =>{
                if(data.id){
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
                        <h1>Create Account</h1>
                        <p>Please register an account.</p>
                    </div>
                    
                    <div className="signin-register-form">
                        <div className="input-group">
                            <label htmlFor="signin-name">FULL NAME</label>
                            <input onChange={this.onNameChange} name="signin-name" type="text" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="signin-email">EMAIL</label>
                            <input onChange={this.onEmailChange} name="signin-email" type="email" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="signin-password">PASSWORD</label>
                            <input onChange={this.onPasswordChange} type="password" />
                        </div>
                        <div className="error-msg"></div>
                        <button onClick={this.onSubmitRegister}>Register</button>
                    </div>

                    <p className="signin-register-footer">
                        Already have an account? <span onClick={() => onRouteChange("signin")}>Signin here</span>.
                    </p>
                </div>
            </div>
        )
    }
}

export default Register;