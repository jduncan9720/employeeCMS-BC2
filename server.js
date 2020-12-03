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
                                "Delete a Department",
                                "View Employees in this Department"
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
                                case "View Employees in this Department":
                                    viewDeptEmployees();
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
                                "Add an Employee",
                                "Update Employee Role",
                                "Delete an Employee"
                            ]
                        }).then(function (response4) {
                            switch (response4.action) {
                                case "View All Employees":
                                viewEmployees()
                                    break;
                                case "Add an Employee":

                                    break;
                                case "Update Employee Role":

                                    break;
                                case "Delete an Employee":

                                    break;
                            }
                        })
                }
                    break;
            }
        })
}

//DEPARTMENTS---------------------------------------

function viewDepts() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
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

function viewDeptEmployees(){

}

//ROLES---------------------------------------------

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    })
};

function addRole() {
    var currentDept;
    var currentDeptID;
    
    connection.query("SELECT name, id FROM department", function (err, res) {
        if (err) throw err;
        var deptArray = res.map(function (obj) {
            return obj.name;
        });
        var idArray = res.map(function (obj2) {
            return obj2.id;
        });
        currentDept = deptArray;
        currentDeptID = idArray;
        console.log(currentDept)
        console.log(currentDeptID)
        
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
            choices: currentDeptID
        }
    ])
        .then(function (response) {
            var query = "INSERT INTO role SET ?"
            connection.query(query, { title: response.roleName, salary: response.roleSalary, department_id: response.roleDept}, function (err, res) {
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
        connection.end();
    })
};