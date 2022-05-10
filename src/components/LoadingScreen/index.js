import React from "react";
import './loadingScreen.css';

export const LoadingScreen = ({entity}) => {


    return (
        <div className='loadingScreen'>
            <h1 className='loadingScreen__header'>Loading {entity}....</h1>
        </div>
    )
}