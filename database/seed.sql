INSERT INTO books (isbn, title, author, category, status) VALUES
('978-3-16-148410-0', 'The Great Gatsby', 'F. Scott Fitzgerald', 'Classic', 'Available'),
('978-1-56619-909-4', '1984', 'George Orwell', 'Dystopian', 'Available'),
('978-0-7432-7356-5', 'To Kill a Mockingbird', 'Harper Lee', 'Classic', 'Issued'),
('978-0-452-28423-4', 'Moby Dick', 'Herman Melville', 'Adventure', 'Available'),
('978-0-06-112008-4', 'Pride and Prejudice', 'Jane Austen', 'Romance', 'Available');

INSERT INTO members (name, email, phone) VALUES
('Alice Johnson', 'alice@example.com', '555-1234'),
('Bob Smith', 'bob@example.com', '555-5678'),
('Carol White', 'carol@example.com', '555-8765'),
('Dave Brown', 'dave@example.com', '555-4321'),
('Eve Davis', 'eve@example.com', '555-0987');

INSERT INTO issued_books (member_id, isbn, issue_date, due_date) VALUES
(1, '978-3-16-148410-0', '2023-10-01', '2023-10-15'),
(2, '978-1-56619-909-4', '2023-10-01', '2023-10-15'),
(3, '978-0-7432-7356-5', '2023-10-01', '2023-10-15');