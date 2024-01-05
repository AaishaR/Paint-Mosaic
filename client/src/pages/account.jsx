import { useEffect, useState } from 'react';
import apiServiceJWT from '../services/JWTService';
import UserDetails from '../components/userDetails';

export default function Account(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(true);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [userInfo, setUesrInfo] = useState('');


    //**************************************** */
    const [errEmail, setErrEmail] = useState('');
    const [errPassword, setErrPassword] = useState('');

    //loggin in with existing user
    const handleLogin =  (e) => {
        e.preventDefault();

        //add input validation for email & password
        setErrPassword(password.trim() === '' ? 'Please enter a password.' : '');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) {
            setErrEmail('');
            (!errPassword.length) && registering()
        } else {
            setErrEmail('Please enter correct email address.');
        }
    };

    const registering = async () => {
        const user = { email, password };
        const res = await apiServiceJWT.login(user);

        if (res.error) {
            alert(`${res.message}`);
            setShowSignIn(false);
            setShowSignUp(true);
        } else {
            const { accessToken, userDetails } = res;
            // console.log(res)
            setUesrInfo(userDetails);
            localStorage.setItem('accessToken', accessToken);
            props.setIsAuthenticated(true);
            setShowSignIn(true);
            setShowSignUp(false);
        }
    }

    const handleLogout = async () => {
        removeToken();
        handleAuth();
    };

    const removeToken = () => {
        apiServiceJWT.logout('accessToken');
    };

    const handleAuth = () => {
        props.setIsAuthenticated(false);
        setShowSignIn(true)
        window.location.reload();
    };

    useEffect(() => {

    }, [props.isAuthenticated])

    //creating a new user
    const handleSignUp = async (e) => {
        //register a new user
        // Check the client-session to see how to handle redirects
        e.preventDefault();
        const user = { email: newEmail, password: newPassword, role: role };
        // console.log(user)
        const res = await apiServiceJWT.register(user);

        if (res.error) {
            console.log(res.error)
            alert(`${res.message}`);
            setShowSignUp(true);
        } else {
            const { accessToken } = res;
            localStorage.setItem('accessToken', accessToken);
            props.setIsAuthenticated(true);
            setShowSignIn(true);
            setShowSignUp(false);
        }
    };

    const handleToggleForm = () => {
        setShowSignIn(!showSignIn);
        setShowSignUp(!showSignUp);
    };

    return (
        <div className="account-container">
            <div className="login-container">
                {showSignIn && (
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
                    ))}

                {showSignUp && (
                    <form>
                        <label>Email:</label>
                        <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                        <label>New Password:</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <label>Re-enter Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
                        <button className='login-btn' type="button" onClick={handleSignUp}> Sign Up </button>
                        <div className='link'>
                            <span onClick={handleToggleForm}>Back to Login</span>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}