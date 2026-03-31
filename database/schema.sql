-- DROP TABLE statements
DROP TABLE IF EXISTS public.reports CASCADE;
DROP TABLE IF EXISTS public.classes CASCADE;
DROP TABLE IF EXISTS public.attendance CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- CREATE TABLE statements
CREATE TABLE public.users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE public.classes (
    class_id SERIAL PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL,
    teacher_id INT REFERENCES public.users(user_id)
);

CREATE TABLE public.attendance (
    attendance_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES public.users(user_id),
    class_id INT REFERENCES public.classes(class_id),
    date DATE NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('Present', 'Absent'))
);

CREATE TABLE public.reports (
    report_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES public.users(user_id),
    month DATE NOT NULL,
    report_data JSON NOT NULL
);

-- CREATE INDEX for frequently queried columns
CREATE INDEX idx_user_id ON public.attendance(user_id);
CREATE INDEX idx_class_id ON public.attendance(class_id);
CREATE INDEX idx_student_id ON public.reports(student_id);