DROP TABLE IF EXISTS issued_books CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS books CASCADE;

CREATE TABLE books (
    isbn VARCHAR(20) PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Available'
);

CREATE TABLE members (
    member_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    registration_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE issued_books (
    id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES members(member_id) ON DELETE CASCADE,
    isbn VARCHAR(20) REFERENCES books(isbn) ON DELETE CASCADE,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE
);

CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_members_email ON members(email);