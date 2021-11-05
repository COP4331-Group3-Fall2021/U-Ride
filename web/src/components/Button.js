import React from 'react';
import '../styles/Button.css';

function Button ({text, color="black", bgcolor="", className=""}) {  // Optional parameters go at the end!
    return(
        <button className={className} style={{backgroundColor:bgcolor, color:color}}>{text}</button>
    );
}

export default Button;