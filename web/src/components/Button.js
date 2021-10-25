import React, { useState } from 'react';
import '../styles/Button.css';

function Button ({text, color="black", bgcolor="#F6E386"}) {  // Optional parameters go at the end!
    return(
        <button style={{backgroundColor:bgcolor, color:color}}>{text}</button>
    );
}

export default Button;