import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Checkout = () => {
    const userId = '1'; // Thay thế bằng ID của người dùng thực tế, có thể lấy từ token
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const fetchCart = async () => {
        const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCart(response.data);
    };

    const handlePlaceOrder = async () => {
        const orderDetails = {
            userId,
            cartItems: cart,
        };

        try {
            await axios.post('http://localhost:5000/api/orders', orderDetails);
            setOrderPlaced(true);
            // Có thể xóa giỏ hàng sau khi đặt hàng thành công
            await axios.delete(`http://localhost:5000/api/cart/${userId}`);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div>
            <h1>Checkout</h1>
            {orderPlaced ? (
                <div>
                    <h2>Your order has been placed successfully!</h2>
                </div>
            ) : (
                <div>
                    <h2>Your Cart Items:</h2>
                    <ul>
                        {cart.map(item => (
                            <li key={item.productId}>
                                Product ID: {item.productId} - Quantity: {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <button onClick={handlePlaceOrder}>Place Order</button>
                </div>
            )}
        </div>
    );
};

export default Checkout;