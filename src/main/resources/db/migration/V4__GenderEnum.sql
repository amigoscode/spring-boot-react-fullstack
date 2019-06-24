CREATE TYPE gender AS ENUM ('MALE', 'FEMALE');

ALTER TABLE student
ALTER COLUMN gender TYPE gender
USING (gender::gender)