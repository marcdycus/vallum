DROP DATABASE IF EXISTS planner_db;
CREATE DATABASE planner_db;
USE planner_db;

CREATE TABLE plans (
  id INTEGER AUTO_INCREMENT NOT NULL,
  plan VARCHAR(280),
  description VARCHAR(1000),
  complete BOOLEAN DEFAULT false,
  table_id integer AUTO_INCREMENT, 
  color_code integer,
  PRIMARY KEY (id)
  );