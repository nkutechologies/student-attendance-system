require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./db');
const studentsRoute = require('./routes/students');
const attendanceRoute = require('./routes/attendance');
const reportsRoute = require('./routes/reports');
const teachersRoute = require('./routes/teachers');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/students', studentsRoute);
app.use('/api/attendance', attendanceRoute);
app.use('/api/reports', reportsRoute);
app.use('/api/teachers', teachersRoute);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;