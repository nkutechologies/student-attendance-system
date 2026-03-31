const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET all users
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT user_id, email, created_at FROM users ORDER BY user_id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT user_id, email, created_at FROM users WHERE user_id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST create user
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id, email, created_at',
            [email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;
        const result = await pool.query(
            'UPDATE users SET email = $1, password = $2 WHERE user_id = $3 RETURNING user_id, email, created_at',
            [email, password, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING user_id', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
