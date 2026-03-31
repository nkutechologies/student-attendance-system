-- Schema for Personal Expense Tracker

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS expenses CASCADE;
DROP TABLE IF EXISTS budgets CASCADE;
DROP TABLE IF EXISTS reports CASCADE;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE expenses (
    expense_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE budgets (
    budget_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    monthly_limit DECIMAL(10, 2) NOT NULL
);

CREATE TABLE reports (
    report_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    month INT NOT NULL,
    year INT NOT NULL,
    total_expenses DECIMAL(10, 2) NOT NULL
);

CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_expense_date ON expenses(date);
CREATE INDEX idx_budget_category ON budgets(category);
CREATE INDEX idx_report_month_year ON reports(month, year);
