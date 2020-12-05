-- Users
INSERT INTO users (username, email) VALUES ("trickster", "trick@ster.io");
INSERT INTO users (username, email) VALUES ("joker", "jo@ker.io");
INSERT INTO users (username, email) VALUES ("sabotage", "sabo@tage.io");

-- Giftees
INSERT INTO giftees (giftee, relation, personality, music, books, movies, clothing_size, user_id)
VALUES ("Severus", "brother", "quirky", "ska", "dystopian fiction", "dark comedy", "L", 3);

INSERT INTO giftees (giftee, relation, personality, music, books, movies, clothing_size, user_id)
VALUES ("Sonny", "friend", "conventional", "pop rock", "self-help", "action", "XL", 2);

INSERT INTO giftees (giftee, relation, personality, music, books, movies, clothing_size, user_id)
VALUES ("Veronica", "girlfriend", "mysterious", "alternative", "novels", "documentary", "M", 1);

INSERT INTO giftees (giftee, relation, personality, music, books, movies, clothing_size, user_id)
VALUES ("Dad", "father", "cerebral", "classical", "philosophy", "foreign", "L", 1);

-- Gifts
INSERT INTO gifts (gift, gift_desc, giftee_id) 
VALUES ("back scratcher", "a wooden tool that helps scrath an itch on one's back", 1);
INSERT INTO gifts (gift, gift_desc, giftee_id) 
VALUES ("", "", 1);
INSERT INTO gifts (gift, gift_desc, giftee_id) 
VALUES ("", "", 1);

INSERT INTO gifts (gift, gift_desc, giftee_id) 
VALUES ("", "", 2);
INSERT INTO gifts (gift, gift_desc, giftee_id) 
VALUES ("", "", 2);
INSERT INTO gifts (gift, gift_desc, giftee_id) 
VALUES ("", "", 2);

INSERT INTO gifts (gift, gift_desc, giftee_id) 
VALUES ("", "", 3);
INSERT INTO gifts (gift, gift_desc, giftee_id) 
VALUES ("", "", 3);
INSERT INTO gifts (gift, gift_desc, giftee_id) 
VALUES ("", "", 3);

INSERT INTO gifts (gift, gift_desc, giftee_id) 
VALUES ("", "", 4);
INSERT INTO gifts (gift, gift_desc, giftee_id) 
VALUES ("", "", 4);
INSERT INTO gifts (gift, gift_desc, giftee_id) 
VALUES ("", "", 4);

-- URLs 
INSERT INTO urls (gift_url, gift_id) 
VALUES ("", 1);
INSERT INTO urls (gift_url, gift_id) 
VALUES ("", 2);
INSERT INTO urls (gift_url, gift_id) 
VALUES ("", 3);
INSERT INTO urls (gift_url, gift_id) 
VALUES ("", 4);
INSERT INTO urls (gift_url, gift_id) 
VALUES ("", 5);
INSERT INTO urls (gift_url, gift_id) 
VALUES ("", 6);
INSERT INTO urls (gift_url, gift_id) 
VALUES ("", 7);
INSERT INTO urls (gift_url, gift_id) 
VALUES ("", 8);
INSERT INTO urls (gift_url, gift_id) 
VALUES ("", 9);
INSERT INTO urls (gift_url, gift_id) 
VALUES ("", 10);
INSERT INTO urls (gift_url, gift_id) 
VALUES ("", 11);
INSERT INTO urls (gift_url, gift_id) 
VALUES ("", 12);