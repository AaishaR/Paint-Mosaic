import { useEffect, useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

export default function Account(props) {

    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(true);

    useEffect(() => {

    }, [props.isAuthenticated])

    return (
        <div className="account-container">
            <div className="login-container">
                {showSignIn && (
                    <Login setShowSignIn={setShowSignIn} showSignIn={showSignIn} setShowSignUp={setShowSignUp} showSignUp={showSignUp} setIsAuthenticated={props.setIsAuthenticated} isAuthenticated={props.isAuthenticated} user={props.user}></Login>
                )}

                {showSignUp && (
                    <Register setShowSignIn={setShowSignIn} showSignIn={showSignIn} setShowSignUp={setShowSignUp} showSignUp={showSignUp} setIsAuthenticated={props.setIsAuthenticated} ></Register>
                )}
            </div>
        </div>
    )
}