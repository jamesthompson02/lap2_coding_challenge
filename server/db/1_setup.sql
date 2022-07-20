DROP TABLE IF EXISTS dogs;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(90),
    pseudonym VARCHAR(255),
    body VARCHAR(255),
    date DATE
);
