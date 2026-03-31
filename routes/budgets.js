const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET all budgets (optionally filter by user_id)
router.get('/', async (req, res) => {
    try {
        const { user_id } = req.query;
        let query = 'SELECT * FROM budgets ORDER BY budget_id';
        let params = [];
        if (user_id) {
            query = 'SELECT * FROM budgets WHERE user_id = $1 ORDER BY budget_id';
            params = [user_id];
        }
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET budget by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM budgets WHERE budget_id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Budget not found' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST create budget
router.post('/', async (req, res) => {
    try {
        const { user_id, category, monthly_limit } = req.body;
        const result = await pool.query(
            'INSERT INTO budgets (user_id, category, monthly_limit) VALUES ($1, $2, $3) RETURNING *',
            [user_id, category, monthly_limit]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT update budget
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, category, monthly_limit } = req.body;
        const result = await pool.query(
            'UPDATE budgets SET user_id = $1, category = $2, monthly_limit = $3 WHERE budget_id = $4 RETURNING *',
            [user_id, category, monthly_limit, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Budget not found' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE budget
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM budgets WHERE budget_id = $1 RETURNING budget_id', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Budget not found' });
        res.json({ message: 'Budget deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
