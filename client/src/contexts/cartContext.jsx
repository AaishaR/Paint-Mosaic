import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        let newCart = []

        if (!cart.find(el => el._id === item._id)) {
            // console.log('new item')
            item.qty = 1
            newCart = [...cart, item];
        }
        else {
            // console.log('already exists')
            item.qty++;
            newCart = [...cart]
        }


        // console.log('Adding to cart:', item);
        setCart(newCart);
    };

    const removeFromCart = (item) => {
        let newCart = []
        if (cart.find(el => el._id === item._id)) {
            newCart = cart.filter(el => el._id !== item._id)
            // console.log(newCart)
        } else {
            newCart = [...cart]
        }

        setCart(newCart)
    }

    // useEffect(() => {
    //     console.log(cart);
    // }, [cart])

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};