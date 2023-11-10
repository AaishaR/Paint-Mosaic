import { Link, useMatch } from 'react-router-dom'
import logo from '../media/logo.png'


export default function Navbar() {

    // const navigate = useNavigate();
    const isArtistProfile = useMatch('/artist');

    const navBarClass = isArtistProfile ? 'artist-navbar' : 'home-navbar';

    return (

        <div className={`navbar-container ${navBarClass}`}>
            <Link to='/'><img src={logo} alt='paint mosaic logo' /></Link>
            <div className='button-container'>
                <Link to='/Account'>Account</Link>
                <Link to='/cart'>shopping cart</Link>
            </div>
        </div>

    )
}