import { Link, useMatch } from 'react-router-dom'
import logo from '../media/mosaic.png';
import { RiAccountPinCircleLine, RiShoppingCartFill } from 'react-icons/ri'


export default function Navbar() {

    // const navigate = useNavigate();
    const isArtistProfile = useMatch('/artist/:artistName');

    const navBarClass = isArtistProfile ? 'artist-navbar' : 'home-navbar';

    return (

        <div className={`navbar-container ${navBarClass}`}>
            <div className='logo'>

                <Link to='/'><img src={logo} alt='paint mosaic logo' /></Link>
                <Link to='/'><span>Paint Mosaic</span></Link>
            </div>
            <div className='button-container'>
                <Link to='/Account' ><RiAccountPinCircleLine className="user" /></Link>
                <Link to='/cart'><RiShoppingCartFill className="shopping_basket" /></Link>
            </div>
        </div>

    )
}