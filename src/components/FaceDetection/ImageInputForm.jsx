import React from "react";
import "./FaceDetection.css";


const ImageInputForm = ({onChangeInput, onSubmitImage}) =>{
    return(
        <div className="image-input">
            <input placeholder="Enter Image URL / Address" onChange={onChangeInput} type="text" />
            <button onClick={onSubmitImage}>Detect Faces</button>
        </div>
    );
}

export default ImageInputForm;