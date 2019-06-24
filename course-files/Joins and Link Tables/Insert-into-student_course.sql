INSERT INTO student_course (
    student_id,
    course_id, 
    start_date, 
    end_date, 
    grade
)
VALUES (
    'e7e40436-b931-441d-85e0-d86b6039fdfa', 
    '7321b9a6-29f7-49e0-9330-6d079c792608', 
    (NOW() - INTERVAL '1 YEAR')::DATE,
    NOW()::DATE,
    90
);