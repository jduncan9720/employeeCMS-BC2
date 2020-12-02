USE employeeDB;

INSERT INTO department (name)
VALUES ("Management/Personel"),
       ("Technology"),
       ("Sales Team")

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100000, 1),
       ("Assitant Manager", 850000, 1),
       ("Project Leader", 80000, 1),
       ("Engineer", 80000, 2),
       ("IT Specialist", 750000, 2),
       ("Sales Manager", 75000, 3),
       ("Sales Person", 55000, 3)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Josh", "Duncan", 1, null),
       ("Mike", "Ford", 2, 1),
       ("Linda", "Forester", 1, null),
       ("Randall", "Hawken", 2, 3),
       ("Stephanie", "Marmet", 3, 2),
       ("Eli", "Fulton", 4, 5),
       ("Terik", "Hone", 4, 5),
       ("Juan", "Perez", 5, 2),
       ("Amy", "Trenton", 6, 1),
       ("Ross", "Pendleton", 7, 9)