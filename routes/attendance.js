const express = require('express');
const { pool } = require('../db');
const router = express.Router();

// GET /api/attendance - List all attendance records
router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM attendance;');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

// GET /api/attendance/stats - Get attendance statistics
router.get('/stats', async (req, res, next) => {
    try {
        const totalRecords = await pool.query('SELECT COUNT(*) FROM attendance;');
        const presentCount = await pool.query('SELECT COUNT(*) FROM attendance WHERE status = \'present\';');
        const absentCount = await pool.query('SELECT COUNT(*) FROM attendance WHERE status = \'absent\';');
        const attendanceRate = (presentCount.rows[0].count / totalRecords.rows[0].count) * 100;

        res.json({
            totalRecords: totalRecords.rows[0].count,
            presentCount: presentCount.rows[0].count,
            absentCount: absentCount.rows[0].count,
            attendanceRate: attendanceRate.toFixed(2)
        });
    } catch (err) {
        next(err);
    }
});

// GET /api/attendance/:id - Get attendance by student ID
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM attendance WHERE student_id = $1;', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// POST /api/attendance - Create a new attendance record
router.post('/', async (req, res, next) => {
    const { student_id, status } = req.body;
    if (!student_id || !status) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    try {
        const result = await pool.query('INSERT INTO attendance (student_id, status) VALUES ($1, $2) RETURNING *;', [student_id, status]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// DELETE /api/attendance/:id - Delete attendance by ID
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM attendance WHERE id = $1 RETURNING *;', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.json({ message: 'Attendance record deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;