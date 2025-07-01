import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
    const userId = '1'; // Thay thế bằng ID của người dùng thực tế, có thể lấy từ token
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCart(response.data);
    };

    const handleRemoveFromCart = async (productId) => {
        await axios.delete(`http://localhost:5000/api/cart/${userId}/remove/${productId}`);
        fetchCart();
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div>
            <h1>Your Cart</h1>
            <ul>
                {cart.map(item => (
                    <li key={item.productId}>
                        Product ID: {item.productId} - Quantity: {item.quantity}
                        <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;