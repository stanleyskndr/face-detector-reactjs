import React from "react";
import "./FaceDetection.css"


const ImageOutput = ({imageUrl, boundingBox}) =>{
    
    return(
        <div className="image-output">
            <div className="image-wrapper">
                <img id="input-image" src={imageUrl} alt=""/>
                {
                    boundingBox == '' ? null : 
                    <div className="bounding-box" 
                            style={{top: boundingBox.top, left: boundingBox.left, 
                                    width: boundingBox.width, height: boundingBox.height}}>
                    </div> 
                }
                
            </div>
            
        </div>
    );
}

export default ImageOutput;