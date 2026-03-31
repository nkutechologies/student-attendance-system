const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./db');
const usersRoutes = require('./routes/users');
const expensesRoutes = require('./routes/expenses');
const budgetsRoutes = require('./routes/budgets');
const reportsRoutes = require('./routes/reports');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Mount API routes
app.use('/api/users', usersRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/budgets', budgetsRoutes);
app.use('/api/reports', reportsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// SPA fallback for other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Listen on PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});

module.exports = app;
