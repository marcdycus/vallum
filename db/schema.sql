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
  color_code varchar(30),
  foreign key (tableId) references tables(tableId) ON DELETE CASCADE,
  primary key (planId)
  );

create table colors (
	schemeId integer auto_increment not null,
  header varchar(40),
  body varchar(40),
  title varchar(40),
  buttons varchar(40),
  primary key (schemeId)
  );