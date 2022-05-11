SELECT student.student_name, subject.subject_name, assignments.submission_date
FROM subject
LEFT JOIN student
ON subject.subject_id = student.subject_id
LEFT JOIN assignments
ON student.student_id = assignments.student_id;