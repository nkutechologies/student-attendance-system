const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET /api/reports/monthly
router.get('/monthly', async (req, res, next) => {
    const { studentId, month } = req.query;
    if (!studentId || !month) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    try {
        const result = await pool.query(`SELECT * FROM reports WHERE student_id = $1 AND month = $2`, [studentId, month]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;