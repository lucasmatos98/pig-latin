SELECT Count(subject.subject_name), subject.subject_name
FROM subject
INNER JOIN student
ON subject.subject_id = student.subject_id
GROUP BY subject_name
HAVING Count(subject.subject_name) > 2;