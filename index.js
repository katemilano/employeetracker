const inquirer = require("inquirer");
const mysql = require("mysql");
// const { addDepartment } = require("./config/orm");
const db = require("./config/orm");
require('console.table');
// const { DB } = require("repl");

function start() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'a',
            choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
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
            // case "Remove Employee":
            //     removeEmployee();
            //     break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            // case "Update Manager":
            //     updateManager();
            //     break;
            case "View All Roles":
                allRoles();
                break;
            case "Add Role":
                addRoles();
                break;
            // case "Remove Role":
            //     removeRole();
            //     break;
            case "View All Departments":
                allDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            // case "Remove Department":
            //     removeDepartment();
            //     break;
            case "Quit":
                db.quit();
        }
    })
}

start();

//good
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

function byManager() {
    db.byManager().then(data => {
        const choices = data.map((dep) => ({ name: dep.first_name, value: dep.id }));
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which manager would you like to see employees for?',
                name: 'manager',
                choices: choices
            }
        ]).then (response => {
            db.managerN(response.manager).then(result => {
                console.table(result);
                start();
            });
        });
    });
}

function allRoles() {
    db.allRoles().then(result => {
        console.table(result);
        start();
    });
}

function allDepartments(){
    db.allDepartments().then(result => {
        console.table(result);
        start();
    });
}


function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What department do you want to add?',
            name: 'department'
        }
    ]).then (response => {
        const dep = response.department;
        db.addDepartment(dep).then(result => {
            // console.table(result);
            start();
        });
    });
}

function addRoles(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What role do you want to add?',
            name: 'role'
        },
        {
            type: 'input',
            message: 'What is the salary of this role?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'What department id of this role?',
            name: 'id'
        }
    ]).then (response => {
        const role = response.role;
        const sal = response.salary;
        const id = response.id;
        db.addRoles(role, sal, id).then(result => {
            start();
        });
    });

}

function addEmployee(){
    db.allRoles().then(data => {
        const choices = data.map((dep) => ({ name: dep.title, value: dep.id }));
        db.byManager().then(d => {
            const man = d.map((man) => ({ name: man.first_name, value: man.id }));

            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the first name of the employee?',
                    name: 'first',
                },
                {
                    type: 'input',
                    message: 'What is the last name of the employee?',
                    name: 'last',
                },
                {
                    type: 'list',
                    message: 'What is the employees role?',
                    name: 'role',
                    choices: choices
                },
                {
                    type: 'list',
                    message: 'Who is the employees manager?',
                    name: 'manager',
                    choices: man
                }
            ]).then (response => {
                const manager = response.manager.toString();
                const role = response.role; 
                const first = response.first;
                const last = response.last;
                const id = manager;

                db.addEmployee(first, last, role, id).then(result => {
                    start();
                });
            });
        })
    })
}



function updateEmployeeRole(){
    db.viewAllEmployees().then(data => {
        const choices = data.map((dep) => ({ name: dep.first_name }));

        db.allRoles().then(dat => {
            const role = dat.map((de) => ({ name: de.title, value: de.id }));

            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Which employee needs to be updated?',
                    name: 'first',
                    choices: choices
                },
                {
                    type: 'list',
                    message: 'What is their new role?',
                    name: 'r',
                    choices: role
                }
            ]).then (response => {
                const name = response.first;
                const r = response.r;
                db.updateEmployeeRole(r, name).then(result => {
                    start();
                });
            });
        });
    });
}

    