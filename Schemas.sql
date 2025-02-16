select * from User;
desc User;

-- insert into User(nickname, email) values('rimi', '66yrlee99@gmail.com');
-- insert into User(nickname, email) values('rim', 'rimi@gmail.com');

select * from Book;
select * from Mark;

show processlist;

select version();

-- create database bookmarkdb_shadow;
-- grant all privileges on bookmarkdb_shadow.* to 'bookmark'@'localhost';
-- flush privileges;

DESCRIBE Book;
DESCRIBE Mark;
