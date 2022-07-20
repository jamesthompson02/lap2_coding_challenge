DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(90),
    pseudonym VARCHAR(60),
    body VARCHAR(500),
    date DATE
);