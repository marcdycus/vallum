DROP DATABASE IF EXISTS planner_db;
CREATE DATABASE planner_db;
USE planner_db;

CREATE TABLE tables (
  tableId INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(280),
  color_code VARCHAR(20),
  PRIMARY KEY (tableId)
  );
  
create table plans (
  planId INTEGER auto_increment not null,
  plan varchar(100),
  description varchar(500),
  tableId integer,
  color_code integer,
  foreign key (tableId) references tables(tableId),
  primary key (planId)
  );