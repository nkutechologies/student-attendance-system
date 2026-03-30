const express = require('express');
const { pool } = require('../db');
const router = express.Router();

// GET /api/students - List all students
router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM students;');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

// GET /api/students/:id - Get student by ID
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM students WHERE student_id = $1;', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// POST /api/students - Create a new student
router.post('/', async (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    try {
        const result = await pool.query('INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *;', [name, email]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// DELETE /api/students/:id - Delete a student
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM students WHERE student_id = $1 RETURNING *;', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;