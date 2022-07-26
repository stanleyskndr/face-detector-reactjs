import React from "react";


const FaceDetectedCount = ({entriesCount}) =>{
    return(
        <div className="entries-count">
            <p>You've detected face in <b>{entriesCount}</b> images so far.</p> 
        </div>
    );
}

export default FaceDetectedCount;