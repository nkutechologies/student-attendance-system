-- Seed data for User table
INSERT INTO "User" (Name, Role, Email, Password) VALUES
('Alice Johnson', 'Teacher', 'alice.johnson@example.com', 'password1'),
('Bob Smith', 'Student', 'bob.smith@example.com', 'password2'),
('Charlie Brown', 'Admin', 'charlie.brown@example.com', 'password3'),
('David Wilson', 'Student', 'david.wilson@example.com', 'password4'),
('Eve Davis', 'Teacher', 'eve.davis@example.com', 'password5');

-- Seed data for Attendance table
INSERT INTO Attendance (ClassID, UserID, Date, Status) VALUES
(1, 1, '2023-10-01', 'Present'),
(1, 2, '2023-10-01', 'Absent'),
(1, 3, '2023-10-01', 'Present'),
(1, 4, '2023-10-01', 'Present'),
(1, 5, '2023-10-01', 'Absent'),
(1, 1, '2023-10-02', 'Present'),
(1, 2, '2023-10-02', 'Present'),
(1, 3, '2023-10-02', 'Absent'),
(1, 4, '2023-10-02', 'Present'),
(1, 5, '2023-10-02', 'Absent');

-- Seed data for Report table
INSERT INTO Report (ClassID, Month, Year, AttendanceData) VALUES
(1, 10, 2023, '{"attendance": [{"userId": "2", "status": "Present"}, {"userId": "3", "status": "Absent"}]}');