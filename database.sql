CREATE TABLE todolist
(
    id SERIAL PRIMARY KEY,
    name VARCHAR (120) NOT NULL,
    importance INTEGER NOT NULL,
    notes text DEFAULT 'Want to Read',
    completed text DEFAULT 'NO'
);