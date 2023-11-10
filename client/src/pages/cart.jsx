import { useCart } from "../contexts/cartContext"

export default function Cart() {

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
        <div className="main-container">
            <div className='Main-container'>
                <h1>Shopping Cart</h1>
                {cart.length ? cart.map((item) => (
                    <div key={item._id} className="artwork-list-container">
                        <div className="img-space">
                            <img className="artwork-img" src={item.image} alt="artwork" />
                        </div>
                        <div className="details-container">
                            <div className="artwork-detials">
                                <p>{item.title} by {item.artist.name}</p>

                            </div>

                            <div className="pricing-container">
                                <p>{item.qty}</p>
                                <p>{item.price}</p>
                                <button onClick={() => { handleClick(item) }}>Remove</button>
                            </div>

                        </div>
                    </div>
                )) :
                    <p>shopping cart is empty</p>}

                <div className="total-container">
                    <p>Total Price: {totalPrice.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}