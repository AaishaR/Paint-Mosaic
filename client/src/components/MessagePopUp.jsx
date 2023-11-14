import React, { useState } from 'react';
import apiServiceJWT from '../services/JWTService';

export default function Popup(props) {
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        // Close the pop-up
        // console.log(props.recevierName)
        apiServiceJWT.addMsg(props.user.username, props.recevierName, inputText )
        props.onClose();
    };

    return (

        <div className="popup-content">
            <p>Send Message</p>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <button onClick={handleSend}>Send</button>
        </div>

    );
};
