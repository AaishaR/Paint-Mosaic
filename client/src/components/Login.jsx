import React, { useState } from 'react'
import UserDetails from './UserDetails';
import apiServiceJWT from '../services/JWTService';

export default function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUesrInfo] = useState('');

    const [errEmail, setErrEmail] = useState('');
    const [errPassword, setErrPassword] = useState('');


    const handleLogin = (e) => {
        e.preventDefault();

        //add input validation for email & password
        setErrPassword(password.trim() === '' ? 'Please enter a password.' : '');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) {
            setErrEmail('');
            (!errPassword.length) && loggingIn()
        } else {
            setErrEmail('Please enter correct email address.');
        }
    };

    const loggingIn = async () => {
        const user = { email, password };
        const res = await apiServiceJWT.login(user);

        if (res.error) {
            alert(`${res.message}`);
            props.setShowSignIn(false);
            props.setShowSignUp(true);
        } else {
            const { accessToken, userDetails } = res;
            // console.log(res)
            setUesrInfo(userDetails);
            localStorage.setItem('accessToken', accessToken);
            props.setIsAuthenticated(true);
            props.setShowSignIn(true);
            props.setShowSignUp(false);
        }
    }

    const handleToggleForm = () => {
        props.setShowSignIn(!props.showSignIn);
        props.setShowSignUp(!props.showSignUp);
    };

    const handleLogout = async () => {
        removeToken();
        handleAuth();
    };

    const removeToken = () => {
        apiServiceJWT.logout('accessToken');
    };

    const handleAuth = () => {
        props.setIsAuthenticated(false);
        props.setShowSignIn(true)
        window.location.reload();
    };

    return (

        <div>
            {
                props.isAuthenticated && props.user ? ( //
                    <div>
                        <UserDetails user={userInfo !== '' ? userInfo : props.user} />
                        <button className='logout-button' onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <form>
                        <label>Email:</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                        {errEmail ? <p className='err-msg'>{errEmail}</p> : null}
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errPassword ? <p className='err-msg'>{errPassword}</p> : null}
                        <button className='login-btn' type="button" onClick={handleLogin}> Login </button>
                        <div className='link'>
                            <span onClick={handleToggleForm}>Create an account</span>
                        </div>
                    </form>
                )}

        </div>
        
    )
}
