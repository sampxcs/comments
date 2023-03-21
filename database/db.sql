-- Comment table
CREATE TABLE IF NOT EXISTS comment (
    id INT AUTO_INCREMENT NOT NULL,
    avatar TEXT NOT NULL,
    content VARCHAR(6000) NOT NULL,
    media JSON NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    answers JSON NOT NULL,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    PRIMARY KEY(id)
);

-- Answer table
CREATE TABLE IF NOT EXISTS answer (
    id INT AUTO_INCREMENT NOT NULL,
    commentId INT NOT NULL,
    avatar TEXT NOT NULL,
    content VARCHAR(6000) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    PRIMARY KEY(id),
    FOREIGN KEY(commentId) REFERENCES comment(id)
);

-- Media table 
CREATE TABLE IF NOT EXISTS media (
    id INT AUTO_INCREMENT NOT NULL,
    commentId INT NOT NULL,
    content MEDIUMBLOB NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(commentId) REFERENCES comment(id)
);