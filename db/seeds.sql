INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal" );

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Associate", 50000, 1),
       ("Supervisor", 75000, 1),
       ("Assistant Manager", 100000, 2),
       ("Manager", 120000, 2),
       ("Account Manager", 150000, 3),
       ("Accountant", 120000, 3),
       ("CEO", 250000, 4),
       ("Marketing Rep", 150000, 4);
    
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dwayne", "Johnson", 1, NULL),
       ("Shawn", "Michaels", 2, NULL),
       ("Billy", "Gunn", 3, NULL),
       ("Kurt", "Angle", 4, NULL),
       ("Chris", "Jericho", 5, NULL),
       ("Matt", "Hardy", 6, NULL),
       ("John", "Cena", 7, NULL),
       ("Trish", "Stratus", 8, NULL);
