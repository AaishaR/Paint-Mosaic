import React, { useState } from 'react'
import apiServiceJWT from '../services/JWTService';

export default function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('')

    const [errEmail, setErrEmail] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const [errRole, setErrRole] = useState('');

    const handleSignUp = async (e) => {
        // Check the client-session to see how to handle redirects
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        setErrPassword(
            password.trim() === '' || confirmPassword.trim() === '' ? 'Please enter a password' : password !== confirmPassword ? 'Passwords do not match! Please re-enter' : ''
        );

        setErrRole(role === '' ? 'Please select one of the roles.' : '')

        if (emailRegex.test(email)) {
            setErrEmail('');
            (!errRole.length && !errPassword.length) && (confirmPassword.trim() !== '') && registering();
        } else {
            setErrEmail('Please enter correct email address');
        }
    };

    const registering = async () => {
        const user = { email: email, password: password, role: role };
        const res = await apiServiceJWT.register(user);

        if (res.error) {
            console.log(res.error)
            alert(`${res.message}`);
            props.setShowSignUp(true);
        } else {
            const { accessToken } = res;
            localStorage.setItem('accessToken', accessToken);
            props.setIsAuthenticated(true);
            props.setShowSignIn(true);
            props.setShowSignUp(false);
        }
    };

    const handleToggleForm = () => {
        props.setShowSignIn(!props.showSignIn);
        props.setShowSignUp(!props.showSignUp);
    };

    return (
        <div>
            <form>
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errEmail ? <p className='err-msg'>{errEmail}</p> : null}
                <label>New Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>Re-enter Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {errPassword ? <p className='err-msg'>{errPassword}</p> : null}
                <div className='radio-buttons'>
                    <label>
                        <input type="radio" name="role" value="seller" checked={role === 'seller'} onChange={() => setRole('seller')} />
                        Sell
                    </label>
                    <label>
                        <input type="radio" name="role" value="buyer" checked={role === 'buyer'} onChange={() => setRole('buyer')} />
                        Buy
                    </label>
                </div>
                {errRole ? <p className='err-msg'>{errRole}</p> : null}
                <button className='login-btn' type="button" onClick={handleSignUp}> Sign Up </button>
                <div className='link'>
                    <span onClick={handleToggleForm}>Back to Login</span>
                </div>
            </form>

        </div>
    )
}
