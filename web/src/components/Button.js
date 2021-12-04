import React from 'react';
import '../styles/Button.css';

export default function Button ({text, onClick=() => {}, color="black", bgcolor="", className="", disabled=false}) {  // Optional parameters go at the end!
    return(
        <button onClick={onClick} className={className} style={{backgroundColor:bgcolor, color:color}} disabled={disabled}>{text}</button>
    );
}
