import React from "react";
import "./NavBar.css"


const NavBar = ({onRouteChange, route, userInSession}) =>{
    switch (route) {
        case "home":
            return(
                <div className="navbar flex-row justify-between align-center ">
                    <h2>😎 FaceFinder</h2>
                    <div>
                        🙋🏼‍♂️ {userInSession.name} &nbsp; | &nbsp; <span className="navbar-cta" onClick={() => onRouteChange("signin")}>Sign out</span> 
                    </div> 
                </div>
                
            );
            break;
        
        case "signin":
            return(
                <div className="navbar flex-row justify-between align-center ">
                    <h2>😎 FaceFinder</h2>
                    <div>
                        <span className="navbar-cta" onClick={() => onRouteChange("register")}>Register</span> 
                    </div>
                    
                </div>
            );
            break;

        case "register":
            return(
                <div className="navbar flex-row justify-between align-center ">
                    <h2>😎 FaceFinder</h2>
                    <div>
                        <span className="navbar-cta" onClick={() => onRouteChange("signin")}>Sign in</span> 
                    </div>
                    
                </div>
            );
            break;
    
        default:
            break;
    }
    
}

export default NavBar;