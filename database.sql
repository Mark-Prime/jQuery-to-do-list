CREATE TABLE todolist
(
    id SERIAL PRIMARY KEY,
    name VARCHAR (120) NOT NULL,
    importance INTEGER NOT NULL,
    notes text,
    completed text DEFAULT 'NO'
);

INSERT INTO todolist
    (name, importance, notes)
VALUES('Do the dishes', 4, '(passive agressively)');
INSERT INTO todolist
    (name, importance, notes)
VALUES('Laundry', 3, 'Don''t do roommates');
INSERT INTO todolist
    (name, importance, notes, completed)
VALUES('Eat leftovers', 1, 'roomates not your own', 'YES'); 