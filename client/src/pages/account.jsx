import { useState } from 'react';
import mona1 from '../media/monalisa1.jpg'
import mona2 from '../media/monalisa2.jpg'
import apiServiceJWT from '../services/JWTService';
import { useNavigate } from 'react-router-dom';
import auth from '../utils/auth';
import UserDetails from '../components/userDetails';

export default function Account(props) {

    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(true);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [userInfo, setUesrInfo] = useState('');

    //loggin in with existing user
    const handleLogin = async (e) => {
        e.preventDefault();
        const user = { username, password };
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
    };

    const handleLogout = () => {
        // console.log('we here')
        removeToken();
        handleAuth();
    };

    const removeToken = async () => {
        await apiServiceJWT.logout('accessToken');
    };
    const handleAuth = () => {
        props.setIsAuthenticated(false);
        setShowSignIn(true);
    };

    //creating a new user
    const handleSignUp = async (e) => {
        //register a new user
        // Check the client-session to see how to handle redirects
        e.preventDefault();
        const user = { username: newUsername, password: newPassword, role: role };
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
            <div className='background-design'>
                {props.isAuthenticated ? (
                    <img src={mona2} alt='img' />
                ) : (<img src={mona1} alt='img' />)}
            </div>
            <div className="login-container">
                {showSignIn && (
                     props.isAuthenticated && props.user ? ( //
                        <div>
                            <UserDetails user={ userInfo !== '' ? userInfo :props.user } />
                            <button className='logout-button' onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <form>
                            <label>Username:</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                            />
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className='login-btn' type="button" onClick={handleLogin}> Login </button>
                            <div>
                                <span onClick={handleToggleForm}>Create an account</span>
                            </div>
                        </form>
                    ))}

                {showSignUp && (
                    <form>
                        <label>New Username:</label>
                        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                        <label>New Password:</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <label>Re-enter Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <div>
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
                        <div>
                            <span onClick={handleToggleForm}>Back to Login</span>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}