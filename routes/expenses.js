const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET all expenses (optionally filter by user_id)
router.get('/', async (req, res) => {
    try {
        const { user_id } = req.query;
        let query = 'SELECT * FROM expenses ORDER BY date DESC';
        let params = [];
        if (user_id) {
            query = 'SELECT * FROM expenses WHERE user_id = $1 ORDER BY date DESC';
            params = [user_id];
        }
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET expense by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM expenses WHERE expense_id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Expense not found' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST create expense
router.post('/', async (req, res) => {
    try {
        const { user_id, category, amount, date } = req.body;
        const result = await pool.query(
            'INSERT INTO expenses (user_id, category, amount, date) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, category, amount, date]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT update expense
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, category, amount, date } = req.body;
        const result = await pool.query(
            'UPDATE expenses SET user_id = $1, category = $2, amount = $3, date = $4 WHERE expense_id = $5 RETURNING *',
            [user_id, category, amount, date, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Expense not found' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE expense
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM expenses WHERE expense_id = $1 RETURNING expense_id', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Expense not found' });
        res.json({ message: 'Expense deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
