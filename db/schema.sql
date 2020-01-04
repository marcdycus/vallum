DROP DATABASE IF EXISTS planner_db;
CREATE DATABASE planner_db;
USE planner_db;

CREATE TABLE plans_holders (
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(280),
  PRIMARY KEY (id)
  );

CREATE TABLE plans (
  id INTEGER AUTO_INCREMENT NOT NULL,
  plan VARCHAR(280),
  description VARCHAR(1000),
  complete BOOLEAN DEFAULT false,
  table_id integer not null, 
  color integer,
  foreign key (table_id) references plans_holders(id),
  PRIMARY KEY (id)
  );