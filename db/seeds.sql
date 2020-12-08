-- Users
INSERT INTO users (username, email) VALUES ("trickster", "trick@ster.io");
INSERT INTO users (username, email) VALUES ("joker", "jo@ker.io");
INSERT INTO users (username, email) VALUES ("sabotage", "sabo@tage.io");

-- Giftees
INSERT INTO giftees (giftee, music_genre, books_genre, movies_genre, UserId)
VALUES ("kid", "ska", "dystopian fiction", "dark comedy", 3);

INSERT INTO giftees (giftee, music_genre, books_genre, movies_genre, UserId)
VALUES ("her", "pop rock", "self-help", "romantic comedy", 2);

INSERT INTO giftees (giftee, music_genre, books_genre, movies_genre, UserId)
VALUES ("her", "alternative", "novels", "documentary", 1);

INSERT INTO giftees (giftee, music_genre, books_genre, movies_genre, UserId)
VALUES ("him", "classical", "philosophy", "foreign", 1);

-- Gifts
INSERT INTO gifts (gift, gift_desc, GifteeId) 
VALUES ("The Skatalites", "A classic album by the original ska veterans", 1);
INSERT INTO gifts (gift, gift_desc, GifteeId) 
VALUES ("1984", "George Orwell's dystopian vision of a totalitarian dictatorship where nothing is true, war is peace, language is abused, and intimacy is forbidden", 1);
INSERT INTO gifts (gift, gift_desc, GifteeId) 
VALUES ("The Dead Don't Die", "Jim Jarmousch's absurdist take on the genre of zombie movies, with a socially-critical subtext", 1);

INSERT INTO gifts (gift, gift_desc, GifteeId) 
VALUES ("", "", 2);
INSERT INTO gifts (gift, gift_desc, GifteeId) 
VALUES ("", "", 2);
INSERT INTO gifts (gift, gift_desc, GifteeId) 
VALUES ("", "", 2);

INSERT INTO gifts (gift, gift_desc, GifteeId) 
VALUES ("", "", 3);
INSERT INTO gifts (gift, gift_desc, GifteeId) 
VALUES ("", "", 3);
INSERT INTO gifts (gift, gift_desc, GifteeId) 
VALUES ("", "", 3);

INSERT INTO gifts (gift, gift_desc, GifteeId) 
VALUES ("", "", 4);
INSERT INTO gifts (gift, gift_desc, GifteeId) 
VALUES ("", "", 4);
INSERT INTO gifts (gift, gift_desc, GifteeId) 
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