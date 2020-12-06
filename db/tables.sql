CREATE TABLE users (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
)

CREATE TABLE giftees (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    for_whom VARCHAR(10) NOT NULL,
    music VARCHAR(50),
    books VARCHAR(50),
    movies VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id)
)

CREATE TABLE gifts (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    gift VARCHAR(255) NOT NULL,
    gift_desc VARCHAR(255),
    FOREIGN KEY (giftee_id) REFERENCES giftees(id)
)

CREATE TABLE urls (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    gift_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (gift_id) REFERENCES gifts(id)
)