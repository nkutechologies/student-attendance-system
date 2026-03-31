-- Seed data for Personal Expense Tracker

INSERT INTO users (email, password) VALUES
('user1@example.com', 'password1'),
('user2@example.com', 'password2'),
('user3@example.com', 'password3'),
('user4@example.com', 'password4'),
('user5@example.com', 'password5');

INSERT INTO expenses (user_id, category, amount, date) VALUES
(1, 'Food', 50.00, '2023-10-01'),
(1, 'Transport', 20.00, '2023-10-02'),
(2, 'Utilities', 100.00, '2023-10-03'),
(3, 'Entertainment', 30.00, '2023-10-04'),
(4, 'Food', 75.00, '2023-10-05');

INSERT INTO budgets (user_id, category, monthly_limit) VALUES
(1, 'Food', 300.00),
(1, 'Transport', 200.00),
(2, 'Utilities', 150.00),
(3, 'Entertainment', 250.00),
(4, 'Food', 400.00);

INSERT INTO reports (user_id, month, year, total_expenses) VALUES
(1, 10, 2023, 70.00),
(2, 10, 2023, 100.00),
(3, 10, 2023, 30.00),
(4, 10, 2023, 75.00),
(5, 10, 2023, 150.00);