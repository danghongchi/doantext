const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Lấy danh sách sản phẩm
router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Thêm sản phẩm
router.post('/', (req, res) => {
    const { name, description, price } = req.body;
    db.query('INSERT INTO products (name, description, price) VALUES (?, ?, ?)', [name, description, price], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Product added!' });
    });
});

// Xóa sản phẩm
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Product deleted!' });
    });
});

// Cập nhật sản phẩm
router.put('/:id', (req, res) => {
    const { name, description, price } = req.body;
    db.query('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Product updated!' });
    });
});

module.exports = router;