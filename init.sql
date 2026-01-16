CREATE TABLE IF NOT EXIST todos (
    id SERIAL PRIMARY KEY,
    text VARCHAR(500) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todos (id, text, completed) VALUES
    (1, 'Buy groceries', true),
    (2, 'go to the gym', false),
    (3, 'Buy milk', true),
    (4, 'watch movies', false);