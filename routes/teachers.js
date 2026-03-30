const express = require('express');
const { pool } = require('../db');
const router = express.Router();

// GET /api/teachers - List all teachers
router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM teachers;');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

// Additional teacher route handlers (GET by ID, POST, DELETE) need to be implemented similarly

module.exports = router;