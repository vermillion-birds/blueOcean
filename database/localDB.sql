DROP TABLE IF EXISTS bird_photos;
DROP TABLE IF EXISTS bird_user;
DROP TABLE IF EXISTS birds;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name varchar(25) not null default null,
  last_namevarchar(45) not null default null,
  username varchar(25) not null default null,
  email varchar(25) not null default null,
  profile_url varchar(2000) default null,
  user_location integer default 0
);

-- know scentific is wrong but thats how it was used
CREATE TABLE birds (
  bird_id SERIAL PRIMARY KEY,
  bird_common_name varchar(75) not null default null,
  scentific_name varchar(95) not null default null
);

CREATE TABLE bird_user (
  b_u_id SERIAL PRIMARY KEY,
  bird_id integer not null default null REFERENCES birds (bird_id),
  user_id integer not null default null REFERENCES users (user_id),
  note varchar(25) not null default null,
  first_seen varchar(35) not null default now(),
  last_seen varchar(35) not null default now(),
  count integer not null default 1
);

CREATE TABLE bird_photos (
  photo_id SERIAL PRIMARY KEY,
  photo_url varchar(2000) default null,
  user_id integer not null default null REFERENCES users (user_id),
  bird_id integer not null default null REFERENCES birds (bird_id),
  location_lat double precision default null,
  location_lon double precision default null,
);

CREATE TABLE friendships (
  friendship_id SERIAL PRIMARY KEY,
  logged_in_user_id integer not null default null REFERENCES users (user_id),
  friend_user_id integer not null default null REFERENCES users (user_id),
);


-- user id needs to be linked with account on sign in from my understanding so either way not needed to start local playground
-- potentially easier to just turn off auth o or learn how to make it work

insert into birds (bird_common_name) VALUES ('owl') returning *;

-- all data should be inputable from the site now, but could use/update statements like the above while developing to be sure all data comming in from site or apis is clean.