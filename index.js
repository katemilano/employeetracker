const inquirer = require("inquirer");
const mysql = require("mysql");

function start() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'a',
            choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Manager", "View All Roles", "Add Role", "Remove Role", "View All Departments", "Add Department", "Remove Department", "Quit"]
        }
    ]).then (response => {
        if (response.a === "View All Employees"){
            viewAllEmployees();
        }else if (response.a === "View All Employees By Department"){
            byDepartment();
        }else if (response.a === "View All Employees By Manager"){
            byManager();
        }else if (response.a === "Add Employee"){
            addEmployee();
        }else if (response.a === "Remove Employee"){
            removeEmployee();
        }else if (response.a === "Update Employee Role"){
            updateEmployeeRole();
        }else if (response.a === "Update Manager"){
            updateManager();
        }else if (response.a === "View All Roles"){
            allRoles();
        }else if (response.a === "Add Role"){
            addRoles();
        }else if (response.a === "Remove Role"){
            removeRole();
        }else if (response.a === "View All Departments"){
            allDepartments();
        }else if (response.a === "Add Department"){
            addDepartment();
        }else if (response.a === "Remove Department"){
            removeDepartment();
        }else {
            
        }
    })
}

start();