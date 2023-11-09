import logo from '../media/logo.png'


export default function Navbar() {
    return (
        <div className="navbar-container">
            <img src={logo} alt='paint mosaic logo'/>
            <div className='button-container'>
                <button>Account</button>
                <button>shopping cart</button>
            </div>

        </div>
    )
}