import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-items">
                    {cart.map(item => (
                        <div className="cart-item" key={item.productId}>
                            <img src={item.imageUrl} alt={item.productName} />
                            <div className="cart-item-details">
                                <h3>{item.productName}</h3>
                                <p>{item.productClass}</p>
                                <p>{item.vendorName}</p>
                                <p>Price: ${item.price}</p>
                                <button 
                                    className="remove-from-cart-btn" 
                                    onClick={() => removeFromCart(item.productId)}  // Optional: Add remove from cart functionality
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;
