import React, { useState } from 'react'
import UserDetails from './UserDetails';
import apiServiceJWT from '../../services/JWTService';
import { useAuth } from '../../contexts/auth';

export default function Login(props) {

    const {login, logout, isAuthenticated, user} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            alert(`User doesn't exists`);
            props.setShowSignIn(false);
            props.setShowSignUp(true);
        } else {
            const { accessToken } = res;
            login(accessToken);
            // console.log(res)
            props.setShowSignIn(true);
            props.setShowSignUp(false);
        }
    }

    const handleToggleForm = () => {
        props.setShowSignIn(!props.showSignIn);
        props.setShowSignUp(!props.showSignUp);
    };

    const handleLogout = async () => {
        logout();
        handleAuth();
    };

    const handleAuth = () => {
        props.setShowSignIn(true)
        window.location.reload();
    };

    return (

        <div>
            {
                isAuthenticated && user ? ( //
                    <div>
                        <UserDetails/>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="submit"
                                className="rounded-md bg-custom-color w-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                        {/* <button className='logout-button' onClick={handleLogout}>Logout</button> */}
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
