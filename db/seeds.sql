INSERT INTO plans_holders (title)
  VALUES
	('titleOne'),
    ('titleTwo'),
    ('titleThree');
  
INSERT INTO plans (plan, description, table_id)
  VALUES
	('planOne', 'descOne', 1),
	('planTwo', 'descTwo', 2),
	('planThree', 'descThree', 1);
    
SELECT * FROM plans;    

SELECT plan, description, complete, color FROM plans 
INNER JOIN plans_holders
ON plans.table_id = plans_holders.id;