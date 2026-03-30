const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET /teachers
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT * FROM "User" WHERE Role = 'Teacher'`);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET /teachers/:id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM "User" WHERE UserID = $1 AND Role = 'Teacher'`, [id]);
    if (result.rows.length === 0) return res.status(404).send('Teacher not found');
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST /teachers
router.post('/', async (req, res, next) => {
  const { Name, Email, Password } = req.body;
  if (!Name || !Email || !Password) return res.status(400).send('Missing fields');

  try {
    const result = await pool.query(`INSERT INTO "User" (Name, Role, Email, Password) VALUES ($1, 'Teacher', $2, $3) RETURNING *`, [Name, Email, Password]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /teachers/:id
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`DELETE FROM "User" WHERE UserID = $1 AND Role = 'Teacher'`, [id]);
    if (result.rowCount === 0) return res.status(404).send('Teacher not found');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;