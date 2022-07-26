import React, {Component} from "react";
import "./App.css";
import NavBar from "./components/Navigation/NavBar.jsx";
import ImageInputForm from "./components/FaceDetection/ImageInputForm.jsx";
import ImageOutput from "./components/FaceDetection/ImageOutput.jsx";
import FaceDetectedCount from "./components/FaceDetection/FaceDetectedCount.jsx";
import Register from "./components/SigninRegister/Register.jsx";
import Signin from "./components/SigninRegister/Signin.jsx";
import Clarifai from "clarifai"

const app = new Clarifai.App({
    apiKey: '919459cf9ead4bdca4b3a32ce49d3410'
});

class App extends Component{
    constructor(){
        super();
        this.state = {
            input: "",
            imageUrl: "",
            boundingBox: "",
            route: "signin",
            isSignedIn: false,
            userInSession: {
                id: "",
                email: "",
                name: "",
                entries: 0,
                joined: ""
            }
        }
    }

    componentDidMount(){
        fetch("https://obscure-ridge-59991.herokuapp.com/")
            .then(response => response.json())
            //.then(data => console.log(data));
    }

    onChangeInput = (event) =>{
        this.setState({input: event.target.value});
    }

    getBoundingBox = (clarifaiResponse) =>{
        const faceCoor = clarifaiResponse.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById("input-image");
        const imageWidth = Number(image.width);
        const imageHeight = Number(image.height);
        const boundingBox = {
            top: faceCoor.top_row * imageHeight,
            left: faceCoor.left_col * imageWidth,
            width: (faceCoor.right_col * imageWidth) - (faceCoor.left_col * imageWidth),
            height: (faceCoor.bottom_row * imageHeight) - (faceCoor.top_row * imageHeight)
        };

        return boundingBox;
    }

    setBoundingBox = (box) =>{
        this.setState({boundingBox: box});
    }

    onSubmitImage = () =>{
        this.setState({imageUrl: this.state.input})
        //this.setState({imageUrl: "https://cdn0-production-images-kly.akamaized.net/1W0IHmTBhP4OUvihYu1Y0eKsyIw=/99x0:766x667/1200x1200/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3595165/original/046832200_1633586754-shutterstock_1432622243.jpg"})
        
        // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response =>{
                this.setBoundingBox(this.getBoundingBox(response));
                
                fetch("https://obscure-ridge-59991.herokuapp.com/image", {
                    method: "put",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: this.state.userInSession.id
                    })
                })
                    .then(response => response.json())
                    .then(count =>{
                        this.setState(Object.assign(this.state.userInSession, {entries: count}))
                    })
            })
            .catch(err =>{
                document.getElementsByClassName("error-msg")[0].innerHTML = "Invalid input. Please enter the correct image url.";
                res.status(400).json("Invalid input. Please enter the correct image url.");
            })
        
        }

    onRouteChange = (route) =>{
        this.setState({route: route});
    }

    setUserInSession = (userData) =>{
        this.setState({userInSession: {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            entries: userData.entries,
            joined: userData.joined
        }});
        //console.log(userData, this.state.userInSession);
    }


    render(){
        switch (this.state.route) {
            case "home":
                return(
                    <div className="App">
                        <div className="tc flex-column">
                            <NavBar onRouteChange={this.onRouteChange} route={this.state.route} userInSession={this.state.userInSession}/>
                            <h1>We'll detect 👱🏼‍♂️ in your image!</h1>
                            <ImageInputForm onChangeInput={this.onChangeInput} onSubmitImage={this.onSubmitImage}/>
                            <div className="error-msg"></div>
                        </div>
                        <FaceDetectedCount entriesCount={this.state.userInSession.entries}/>
                        <ImageOutput imageUrl={this.state.imageUrl} boundingBox={this.state.boundingBox}/>
                    </div>
                );
                break;
            
            case "signin":
                return(
                    <div className="App">
                        <NavBar onRouteChange={this.onRouteChange} route={this.state.route} userInSession={this.state.userInSession}/>
                        <Signin onRouteChange={this.onRouteChange} setUserInSession={this.setUserInSession}/>
                    </div>
                );
                break;
        
            case "register":
                return(
                    <div className="App">
                        <NavBar onRouteChange={this.onRouteChange} route={this.state.route} userInSession={this.state.userInSession}/>
                        <Register onRouteChange={this.onRouteChange} setUserInSession={this.setUserInSession}/>
                    </div>
                );
                break;

            default:
                break;
        }
        
    }
}


//    "react-scripts": "5.0.1",
export default App;