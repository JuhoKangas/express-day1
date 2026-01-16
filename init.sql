CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    text VARCHAR(500) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todos (text, completed) VALUES
    ('Buy groceries', true),
    ('go to the gym', false),
    ('Buy milk', true),
    ('watch movies', false);