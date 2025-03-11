import React, { useState, useEffect, useContext } from 'react';
import { getProducts } from '../utils/api';
import '../styles/productlist.css';
import { CartContext } from '../context/CartContext';  // Import the CartContext

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Access the addToCart function from CartContext
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const productsData = await getProducts();
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
            setErrorMessage('Error fetching products.');
        }
    };

    return (
        <div className="container">
            <h2>Products</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className="product-grid">
                {products.map(product => (
                    <div className="product-card" key={product.productId}>
                        <img src={product.imageUrl} alt={product.productName} />
                        <h3>{product.productName}</h3>
                        <p>{product.productClass}</p>
                        <p>{product.vendorName}</p>
                        <p>${product.price}</p>
                        <button
                            className='add-to-cart-btn'
                            onClick={() => addToCart(product)}  // Use addToCart from context
                        >
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
