const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET /attendance/stats
router.get('/stats', async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT COUNT(*) AS totalRecords, \
                                            SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) AS presentCount, \
                                            SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) AS absentCount,\
                                            (SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS attendanceRate\
                                     FROM Attendance`);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// GET /attendance
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT * FROM Attendance`);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET /attendance/:id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM Attendance WHERE AttendanceID = $1`, [id]);
    if (result.rows.length === 0) return res.status(404).send('Attendance record not found');
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST /attendance
router.post('/', async (req, res, next) => {
  const { ClassID, UserID, Date, Status } = req.body;
  if (!ClassID || !UserID || !Date || !Status) return res.status(400).send('Missing fields');

  try {
    const result = await pool.query(`INSERT INTO Attendance (ClassID, UserID, Date, Status) VALUES ($1, $2, $3, $4) RETURNING *`, [ClassID, UserID, Date, Status]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /attendance/:id
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`DELETE FROM Attendance WHERE AttendanceID = $1`, [id]);
    if (result.rowCount === 0) return res.status(404).send('Attendance record not found');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;