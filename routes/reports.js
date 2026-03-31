const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET all reports (optionally filter by user_id)
router.get('/', async (req, res) => {
    try {
        const { user_id } = req.query;
        let query = 'SELECT * FROM reports ORDER BY report_id';
        let params = [];
        if (user_id) {
            query = 'SELECT * FROM reports WHERE user_id = $1 ORDER BY report_id';
            params = [user_id];
        }
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET report by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM reports WHERE report_id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Report not found' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST create report
router.post('/', async (req, res) => {
    try {
        const { user_id, month, year, total_expenses } = req.body;
        const result = await pool.query(
            'INSERT INTO reports (user_id, month, year, total_expenses) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, month, year, total_expenses]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE report
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM reports WHERE report_id = $1 RETURNING report_id', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Report not found' });
        res.json({ message: 'Report deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
