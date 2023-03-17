-- Table comments
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    avatar VARCHAR(10000),
    content VARCHAR(400) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    answers JSON NOT NULL,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0
);