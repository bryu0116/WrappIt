CREATE TABLE users (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
)

CREATE TABLE gifts (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    gift VARCHAR(255) NOT NULL,
    gift_desc VARCHAR(255),
    gift_url VARCHAR(255),
    img_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
)