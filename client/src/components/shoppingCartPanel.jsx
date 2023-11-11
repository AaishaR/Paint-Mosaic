import React from 'react';
import { useCart } from "../contexts/cartContext";
import { MdOutlineDeleteForever } from 'react-icons/md';
import { RiCloseFill } from 'react-icons/ri';

const ShoppingCartPanel = ({ onClose, isOpen }) => {

  const { removeFromCart } = useCart();

  const handleClick = (item) => {
    // console.log('Handling click for item:', item);
    removeFromCart(item);
  }

  const { cart } = useCart();

  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace(/[^\d.-]/g, ''));
    return total + itemPrice * item.qty;
  }, 0);


  return (
    <div className={`shopping-cart-panel ${isOpen ? 'open' : ''}`}>
      <div className="panel-header">
        <h3>Shopping Cart</h3>
        <div className="close-icon" onClick={onClose}><RiCloseFill className='close' /></div>
      </div>
      <div className="cart-main-container">
        {cart.length ? cart.map((item) => (
          <div key={item._id} className="cart-list-container">
            <div className="img-icon">
              <img className="art-img" src={item.image} alt="artwork" />
            </div>
            <div className="cart-details-container">
              <div className="cart-art-detials">
                <p>{item.title} by {item.artist.name}</p>
              </div>

              <div className="qty-pricing-container">
                <p> {item.qty}</p>
                <p> x </p>
                <p>{item.price}</p>
                <div onClick={() => { handleClick(item) }}><MdOutlineDeleteForever className="remove" /></div>
              </div>
            </div>
          </div>
        )) :
          <p className='empty-cart'>shopping cart is empty</p>}

        <div className="total-container">
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>

      </div>
    </div>
  );
};

export default ShoppingCartPanel;