const inquirer = require("inquirer");
const mysql = require("mysql");
const db = require("./config/orm");
require('console.table');
// const { DB } = require("repl");

function start() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'a',
            choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Manager", "View All Roles", "Add Role", "Remove Role", "View All Departments", "Add Department", "Remove Department", "Quit"]
        }
    ]).then (response => {
        switch (response.a){
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Employees By Department":
                byDepartment();
                break;
            case "View All Employees By Manager":
                byManager();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Manager":
                updateManager();
                break;
            case "View All Roles":
                allRoles();
                break;
            case "Add Role":
                addRoles();
                break;
            case "Remove Role":
                removeRole();
                break;
            case "View All Departments":
                allDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Remove Department":
                removeDepartment();
                break;
            case "Quit":
                db.quit();
        }
    })
}

start();

function viewAllEmployees() {
    db.viewAllEmployees().then(result => {
        console.table(result);
        start();
    });
}

function byDepartment() {
    db.allDepartments().then(data => {
        const choices = data.map((dep) => ({ name: dep.name, value: dep.id }));

        inquirer.prompt([
            {
                type: 'list',
                message: 'Which department would you like to see employees for?',
                name: 'department',
                choices: choices
            }
        ]).then (response => {
            db.byDepartment(response.department).then(result => {
                console.table(result);
                start();
            });
        });
    });
}


