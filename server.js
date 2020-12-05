var mysql = require("mysql");
var inquirer = require("inquirer")
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "jdroot04",
    database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start()
});

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Work with Departments",
                "Work with Roles",
                "Work with Employees"
            ]
        }).then(function (response) {
            switch (response.action) {
                case "Work with Departments": {
                    inquirer
                        .prompt({
                            name: "action",
                            type: "list",
                            message: "What would you like to do with departments?",
                            choices: [
                                "View All Departments",
                                "Add a Department",
                                "Delete a Department"
                            ]
                        }).then(function (response2) {
                            switch (response2.action) {
                                case "View All Departments":
                                    viewDepts();
                                    break;
                                case "Add a Department":
                                    addDepts();
                                    break;
                                case "Delete a Department":
                                    deleteDepts();
                                    break;
                            }
                        })
                }
                    break;
                case "Work with Roles": {
                    inquirer
                        .prompt({
                            name: "action",
                            type: "list",
                            message: "What would you like to do with roles?",
                            choices: [
                                "View All Roles",
                                "Add a Role",
                                "Delete a Role"
                            ]
                        }).then(function (response3) {
                            switch (response3.action) {
                                case "View All Roles":
                                    viewRoles();
                                    break;
                                case "Add a Role":
                                    addRole();
                                    break;
                                case "Delete a Role":
                                    deleteRole()
                                    break;
                            }
                        })
                }
                    break;
                case "Work with Employees": {
                    inquirer
                        .prompt({
                            name: "action",
                            type: "list",
                            message: "What would you like to do with Employees?",
                            choices: [
                                "View All Employees",
                                "View Employees by Department",
                                "Add an Employee",
                                "Update Employee Role",
                                "Delete an Employee"
                            ]
                        }).then(function (response4) {
                            switch (response4.action) {
                                case "View All Employees":
                                    viewEmployees()
                                    break;
                                    case "View Employees by Department":
                                    employByDept()
                                    break;
                                case "Add an Employee":
                                    addEmployee()
                                    break;
                                case "Update Employee Role":
                                    changeRole();
                                    break;
                                case "Delete an Employee":
                                    deleteEmployee()
                                    break;
                            }
                        })
                }
                    break;
            }
        })
}

//START OVER--------------------------------------

function doMore(){
    inquirer.prompt(
        {
        name: "more",
        type: "confirm",
        message: "Would you like to do something else?",
    }).then(function (response) {
        switch (response.more){
            case true:
                start();
                break;
            case false:
                console.log("Have a great day!")
                connection.end();
        }
    })
}

//DEPARTMENTS---------------------------------------

function viewDepts() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        doMore()
    })
};

function addDepts() {
    inquirer
        .prompt({
            name: "deptName",
            type: "input",
            message: "What is the name of the department?"
        })
        .then(function (response) {
            var query = "INSERT INTO department SET ?"
            connection.query(query, { name: response.deptName }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Department Added!\n");

                viewDepts();
            });
        });
};

function deleteDepts() {
    var currentDept;
    connection.query("SELECT name FROM department", function (err, res) {
        if (err) throw err;
        var deptArray = res.map(function (obj) {
            return obj.name;
        });
        currentDept = deptArray;
        console.log(currentDept)
        inquirer
            .prompt({
                name: "deleteName",
                type: "list",
                message: "What is the name of the department you'd like to delete?",
                choices: currentDept
            })
            .then(function (response) {
                console.log(response.deleteName)
                var query = "DELETE FROM department WHERE ?"
                connection.query(query, { name: response.deleteName }, function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " Department Deleted!\n");

                    viewDepts();
                });
            });
    })
};

//ROLES---------------------------------------------

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        doMore()
    })
};

function addRole() {
    var currentDept;

    connection.query("SELECT name, id FROM department", function (err, res) {
        if (err) throw err;
        var deptArray = res.map(function (obj) {
            return { name: obj.name, value: obj.id };
        });

        currentDept = deptArray;

        inquirer
            .prompt([{
                name: "roleName",
                type: "input",
                message: "What is the name of the role?"
            },
            {
                name: "roleSalary",
                type: "input",
                message: "How much is the salary of this role?"
            },
            {
                name: "roleDept",
                type: "list",
                message: "Which department does this role belong to?",
                choices: currentDept
            }
            ])
            .then(function (response) {
                var query = "INSERT INTO role SET ?"
                connection.query(query, { title: response.roleName, salary: response.roleSalary, department_id: response.roleDept }, function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " Role Added!\n");

                    viewRoles();
                });
            });
    });
};

function deleteRole() {
    var currentRole;
    connection.query("SELECT title FROM role", function (err, res) {
        if (err) throw err;
        var titleArray = res.map(function (obj) {
            return obj.title;
        });
        currentRole = titleArray;
        console.log(currentRole)
        inquirer
            .prompt({
                name: "deleteRole",
                type: "list",
                message: "What is the title of the role you'd like to delete?",
                choices: currentRole
            })
            .then(function (response) {
                console.log(response.deleteRole)
                var query = "DELETE FROM role WHERE ?"
                connection.query(query, { title: response.deleteRole }, function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " Role Deleted!\n");

                    viewRoles();
                });
            });
    })
};


//Employees-----------------------------------------

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        doMore()
    })
};

function addEmployee() {
    var currentRoles;
    var currentEmployees;

    connection.query("SELECT title, id from role", function (err, res) {
        if (err) throw err;
        var rolesArray = res.map(function (obj) {
            return { name: obj.title, value: obj.id };
        });

        currentRoles = rolesArray;


        connection.query("SELECT first_name, last_name, id from employee", function (err, res) {
            if (err) throw err;
            var employeeArray = res.map(function (obj) {
                return { name: obj.first_name + " " + obj.last_name, value: obj.id };
            });

            currentEmployees = employeeArray;

            inquirer
                .prompt([
                    {
                        name: "firstName",
                        type: "input",
                        message: "What is the first name of the new employee?"
                    },
                    {
                        name: "lastName",
                        type: "input",
                        message: "What is the last name of the new employee?"
                    },
                    {
                        name: "employRole",
                        type: "list",
                        message: "What is this employee's role?",
                        choices: currentRoles
                    },
                    {
                        name: "employManage",
                        type: "list",
                        message: "Who, if anyone, manages this employee?",
                        choices: currentEmployees
                    }

                ]).then(function (response) {
                    var query = "INSERT INTO employee SET ?"
                    connection.query(query, { first_name: response.firstName, last_name: response.lastName, role_id: response.employRole, manager_id: response.employManage }, function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " Employee Added!\n");

                        viewEmployees()
                    });
                });
        });
    });
};

function changeRole() {
    var currentRoles;
    var currentEmployees;

    connection.query("SELECT title, id from role", function (err, res) {
        if (err) throw err;
        var rolesArray = res.map(function (obj) {
            return { name: obj.title, value: obj.id };
        });

        currentRoles = rolesArray;


        connection.query("SELECT first_name, last_name, id from employee", function (err, res) {
            if (err) throw err;
            var employeeArray = res.map(function (obj) {
                return { name: obj.first_name + " " + obj.last_name, value: obj.id };
            });

            currentEmployees = employeeArray;

            inquirer
                .prompt([
                    {
                        name: "employName",
                        type: "list",
                        message: "Which employee is changing roles?",
                        choices: currentEmployees
                    },
                    {
                        name: "newRole",
                        type: "list",
                        message: "What is their new role?",
                        choices: currentRoles
                    }
                ]).then(function (response) {
                    var query = "UPDATE employee SET ? WHERE ?";
                    connection.query(query, [{ role_id: response.newRole }, { id: response.employName }], function (err, res){
                        if (err) throw err;
                        console.log(res.affectedRows + " Role Changed!\n");
                        viewEmployees()
                    })  
                })
        });
    });
}

function deleteEmployee(){
    var currentEmployees;
    connection.query("SELECT first_name, last_name, id from employee", function (err, res) {
        if (err) throw err;
        var employeeArray = res.map(function (obj) {
            return { name: obj.first_name + " " + obj.last_name, value: obj.id };
        });
        currentEmployees = employeeArray;

        inquirer
            .prompt({
                name: "deleteEmployee",
                type: "list",
                message: "What is the name of the emplyee you'd like to delete?",
                choices: currentEmployees
            })
            .then(function (response) {
                console.log(response.deleteEmployee)
                var query = "DELETE FROM employee WHERE ?"
                connection.query(query, { id: response.deleteEmployee }, function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " Employee Deleted!\n");

                    viewEmployees();
                });
            });
    })
};




function employByDept(){
    

}