import { Link } from 'react-router-dom'
import logo from '../media/mosaic.png';
import { RiAccountPinCircleLine, RiShoppingCartFill } from 'react-icons/ri'
import { useState } from 'react';
import ShoppingCartPanel from './shoppingCartPanel';


export default function Navbar() {

    return (

        <div className="navbar-container">
            <div className="logo">
                <Link to="/">
                    <img className='logo' src={logo} alt="paint mosaic logo" />
                </Link>
                <Link to="/">
                    <span>Paint Mosaic</span>
                </Link>
            </div>
            <div className="button-container">
                <Link to="/Account">
                    <RiAccountPinCircleLine className="user" />
                </Link>
            </div>
        </div>

    )
}