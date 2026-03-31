-- INSERT statements for users
INSERT INTO public.users (username, password, role) VALUES
('teacher1', 'pass123', 'Teacher'),
('student1', 'pass123', 'Student'),
('student2', 'pass123', 'Student'),
('student3', 'pass123', 'Student'),
('admin1', 'pass123', 'Admin');

-- INSERT statements for classes
INSERT INTO public.classes (class_name, teacher_id) VALUES
('Math', 1),
('Science', 1),
('History', 1);

-- INSERT statements for attendance
INSERT INTO public.attendance (user_id, class_id, date, status) VALUES
(2, 1, '2023-10-01', 'Present'),
(2, 1, '2023-10-02', 'Absent'),
(3, 1, '2023-10-01', 'Present'),
(3, 1, '2023-10-02', 'Present'),
(2, 2, '2023-10-01', 'Absent');

-- INSERT statements for reports
INSERT INTO public.reports (student_id, month, report_data) VALUES
(2, '2023-10-01', '{"attendance": [{"date": "2023-10-01", "status": "Absent"}]}'),
(3, '2023-10-01', '{"attendance": [{"date": "2023-10-01", "status": "Present"}]}');