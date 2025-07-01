const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Giỏ hàng sẽ được lưu trong bộ nhớ tạm thời (session) hoặc trong cơ sở dữ liệu tùy theo yêu cầu
// Để đơn giản, chúng ta sẽ sử dụng bộ nhớ tạm thời cho ví dụ này

let carts = {}; // Giả sử chúng ta sẽ lưu trữ giỏ hàng theo userId

// Thêm sản phẩm vào giỏ hàng
router.post('/:userId/add', (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    if (!carts[userId]) {
        carts[userId] = [];
    }

    const existingProductIndex = carts[userId].findIndex(item => item.productId === productId);
    if (existingProductIndex > -1) {
        carts[userId][existingProductIndex].quantity += quantity;
    } else {
        carts[userId].push({ productId, quantity });
    }

    res.json({ message: 'Product added to cart' });
});

// Lấy giỏ hàng của user
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    res.json(carts[userId] || []);
});

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/:userId/remove/:productId', (req, res) => {
    const { userId, productId } = req.params;
    if (!carts[userId]) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    carts[userId] = carts[userId].filter(item => item.productId !== productId);
    res.json({ message: 'Product removed from cart' });
});

module.exports = router;