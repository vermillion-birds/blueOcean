DROP TABLE IF EXISTS bird_photos;
DROP TABLE IF EXISTS bird_user;
DROP TABLE IF EXISTS birds;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name,
  last_name,
  username,
  email,
  profile_url,
  user_location
);

-- know scentific is wrong but thats how it was used
CREATE TABLE birds (
  bird_id SERIAL PRIMARY KEY,
  bird_common_name,
  scentific_name
);

CREATE TABLE bird_user (
  b_u_id SERIAL PRIMARY KEY,
  bird_id,
  user_id,
  note,
  first_seen,
  last_seen,
  count
);

CREATE TABLE bird_photos (
  photo_id SERIAL PRIMARY KEY,
  photo_url,
  user_id,
  bird_id,
  location_lat,
  location_lon,
);

CREATE TABLE friendships (
  friendship_id SERIAL PRIMARY KEY,
  logged_in_user_id,
  friend_user_id,
);


-- user id needs to be linked with account on sign in from my understanding so either way not needed to start local playground
-- potentially easier to just turn off auth o or learn how to make it work

insert into birds (bird_common_name) VALUES ('raven') returning *;
insert into birds (bird_common_name) VALUES ('crow') returning *;
insert into birds (bird_common_name) VALUES ('owl') returning *;

-- all other data should be inputable from the site, and would remove/update these once up and running and sure all data comming in from site or apis is clean.