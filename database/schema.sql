-- DROP TABLE IF EXISTS statements
DROP TABLE IF EXISTS Report CASCADE;
DROP TABLE IF EXISTS Attendance CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- CREATE TABLE statements
CREATE TABLE "User" (
    UserID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Role VARCHAR(50) NOT NULL CHECK (Role IN ('Teacher', 'Student', 'Admin')),
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE Attendance (
    AttendanceID SERIAL PRIMARY KEY,
    ClassID INTEGER NOT NULL,
    UserID INTEGER NOT NULL,
    Date DATE NOT NULL,
    Status VARCHAR(10) NOT NULL CHECK (Status IN ('Present', 'Absent')),
    FOREIGN KEY (UserID) REFERENCES "User"(UserID) ON DELETE CASCADE
);

CREATE TABLE Report (
    ReportID SERIAL PRIMARY KEY,
    ClassID INTEGER NOT NULL,
    Month INTEGER NOT NULL CHECK (Month BETWEEN 1 AND 12),
    Year INTEGER NOT NULL,
    AttendanceData JSONB NOT NULL
);

-- CREATE INDEX statements
CREATE INDEX idx_user_email ON "User"(Email);
CREATE INDEX idx_attendance_userid ON Attendance(UserID);
CREATE INDEX idx_report_month_year ON Report(Month, Year);