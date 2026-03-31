const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET /api/students
router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE role = 'Student'`);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

// GET /api/students/:id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM users WHERE user_id = $1 AND role = 'Student'`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// POST /api/students
router.post('/', async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    try {
        const result = await pool.query(`INSERT INTO users (username, password, role) 
                                           VALUES ($1, $2, 'Student') RETURNING *`, [username, password]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// DELETE /api/students/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`DELETE FROM users WHERE user_id = $1 AND role = 'Student' RETURNING *`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;