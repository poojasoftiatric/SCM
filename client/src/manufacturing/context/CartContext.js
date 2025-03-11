import React, { createContext, useState } from 'react';

// Create the CartContext
export const CartContext = createContext();

// CartProvider component to wrap the app
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add a product to the cart
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Remove a product from the cart (optional)
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.productId !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
