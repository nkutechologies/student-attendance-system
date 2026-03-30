const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET /reports/monthly
router.get('/monthly', async (req, res, next) => {
  const { classId, month, year } = req.query;
  if (!classId || !month || !year) return res.status(400).send('Missing query parameters');

  try {
    const result = await pool.query(`SELECT * FROM Report WHERE ClassID = $1 AND Month = $2 AND Year = $3`, [classId, month, year]);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;