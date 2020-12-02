var mysql = require("mysql");
var inquirer = require("inquirer")

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

                                    break;
                                case "Add a Department":

                                    break;
                                case "Delete a Department":

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

                                    break;
                                case "Add a Role":

                                    break;
                                case "Delete a Role":

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

