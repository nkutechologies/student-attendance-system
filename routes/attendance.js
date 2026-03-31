const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET /api/attendance/stats
router.get('/stats', async (req, res, next) => {
    try {
        const result = await pool.query(`SELECT COUNT(*) AS totalRecords, 
                                                      SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) AS presentCount, 
                                                      SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) AS absentCount, 
                                                      (SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS attendanceRate 
                                               FROM attendance`);
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// GET /api/attendance/:id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM attendance WHERE attendance_id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// POST /api/attendance
router.post('/', async (req, res, next) => {
    const { user_id, class_id, date, status } = req.body;
    if (!user_id || !class_id || !date || !status) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    try {
        const result = await pool.query(`INSERT INTO attendance (user_id, class_id, date, status) 
                                           VALUES ($1, $2, $3, $4) RETURNING *`, [user_id, class_id, date, status]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// DELETE /api/attendance/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`DELETE FROM attendance WHERE attendance_id = $1 RETURNING *`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }
        res.json({ message: 'Attendance record deleted' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;