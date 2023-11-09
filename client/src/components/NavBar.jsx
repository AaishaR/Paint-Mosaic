import { Link } from 'react-router-dom'
import logo from '../media/logo.png'


export default function Navbar() {
    return (
        <div className="navbar-container">
            <Link to='/'><img src={logo} alt='paint mosaic logo' /></Link>
            <div className='button-container'>
                <Link to='/Account'>Account</Link>
                <Link to='/cart'>shopping cart</Link>
            </div>

        </div>
    )
}