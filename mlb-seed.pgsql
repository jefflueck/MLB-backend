-- both test users have the password "password"

INSERT INTO users (username, password)
VALUES ('testuser',
'$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q'),
('testuser2',
'$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q');

INSERT INTO teams (name, first, second, third, ss, c, lf, cf, rf, p, user_id)
VALUES ('testteam', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 1), ('testteam2', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 2);





