const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Đặt hàng
router.post('/', (req, res) => {
    const { userId, cartItems } = req.body;

    // Lưu đơn hàng vào cơ sở dữ liệu
    db.query('INSERT INTO orders (userId) VALUES (?)', [userId], (err, result) => {
        if (err) return res.status(500).json(err);

        const orderId = result.insertId;
        const orderPromises = cartItems.map(item => {
            return db.query('INSERT INTO order_items (orderId, productId, quantity) VALUES (?, ?, ?)', [orderId, item.productId, item.quantity]);
        });

        Promise.all(orderPromises)
            .then(() => {
                res.status(201).json({ message: 'Order placed successfully' });
            })
            .catch(err => res.status(500).json(err));
    });
});

module.exports = router;