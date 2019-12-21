DROP DATABASE IF EXISTS planner_db;
CREATE DATABASE planner_db;
USE planner_db;

CREATE TABLE plans (
  id INTEGER AUTO_INCREMENT NOT NULL,
  plan VARCHAR(280),
  in_table BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
  );