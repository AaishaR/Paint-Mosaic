import { useState } from 'react';
import desingImg from '../media/default.jpg'

export default function Account() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accountType, setAccountType] = useState('');

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleSignUp = () => {
        setIsLoggedIn(true);
    };

    const handleToggleForm = () => {
        setShowSignUp(!showSignUp);
    };

    return (
        <div className="account-container">
            <div className='background-design'>
                <img src={desingImg} />
            </div>
            <div className="login-container">
                {isLoggedIn ? (
                    <div>
                        <p>Welcome, {username}!</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <form>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                        <button type="button" onClick={handleLogin}> Login </button>
                        <div>
                            <span onClick={handleToggleForm}>Create an account</span>
                        </div>
                    </form>
                )}

                {showSignUp && (
                    <form>
                        <label>New Username:</label>
                        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
                        <label>New Password:</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                        <label>Re-enter Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <div>
                            <label>
                                <input type="radio" name="accountType" value="sell" checked={accountType === 'sell'} onChange={() => setAccountType('sell')} />Sell
                            </label>
                            <label>
                                <input type="radio" name="accountType" value="buy" checked={accountType === 'buy'} onChange={() => setAccountType('buy')} />
                                Buy
                            </label>
                        </div>
                        <button type="button" onClick={handleSignUp}> Sign Up </button>
                        <div>
                            <span onClick={handleToggleForm}>Back to Login</span>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}