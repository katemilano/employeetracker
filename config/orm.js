const connection = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection;
    }

    viewAllEmployees() {
        return this.connection.query('SELECT * FROM employee');
    }

    byDepartment(id){
      return this.connection.query(
        'SELECT id, first_name, last_name FROM employee INNER JOIN department ON employee.id = department.id where department.id = ?', [id]);
    };

    byManager(){
        return this.connection.query('SELECT department FROM employees');
    };

    addEmployee(){
        this.connection.query('SELECT * FROM employee', (err, results) => {
            if (err) throw err;
            // once you have the items, prompt the user for which they'd like to bid on
            inquirer
              .prompt([
                
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
                    choices: ["Sales Lead", "Salesperson", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"]
                },
                {
                    type: 'list',
                    message: 'Who is the employees manager?',
                    name: 'manager',
                    choices() {
                        const choiceArray = [];
                        results.forEach(({ manager_id }) => {
                          choiceArray.push(manager_id);
                        });
                        return choiceArray;
                    } 
                }
              ])
              .then((answer) => {

                // get the information of the chosen item
                if (answer.role === "Sales Lead" || "Salesperson"){

                    this.connection.query(
                        'INSERT INTO employee SET ?',
                        {
                          first_name: `${answer.first}`,
                          last_name: `${answer.last}`,
                          role_id: "1",
                        },
                        (err, res) => {
                          if (err) throw err;
                          console.log(`${answer.first} ${answer.last} was added!\n`);

                        }
                    )

                }else if(answer.role === "Software Engineer"){

                }else if(answer.role === "Legal Team Lead"){

                }else {

                }
              })
            })
    };


    removeEmployee(){

    };

    updateEmployeeRole(){
        console.log('Updating all Rocky Road quantities...\n');
        const query = connection.query(
          'UPDATE products SET ? WHERE ?',
          [
            {
              quantity: 100,
            },
            {
              flavor: 'Rocky Road',
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} products updated!\n`);
            // Call deleteProduct AFTER the UPDATE completes
            deleteProduct();
          }
        );

    };

    updateManager(){
        console.log('Updating all Rocky Road quantities...\n');
        const query = connection.query(
          'UPDATE products SET ? WHERE ?',
          [
            {
              quantity: 100,
            },
            {
              flavor: 'Rocky Road',
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} products updated!\n`);
            // Call deleteProduct AFTER the UPDATE completes
            deleteProduct();
          }
        );

    };

    allRoles(){
        return this.connection.query(
            'SELECT * FROM role', (err, res) => {
                if (err) throw err;

                console.log(res);
                connection.end();
            });
    };



    addRoles(){
        this.connection.query('SELECT * FROM role', (err, results) => {
            if (err) throw err;
            // once you have the items, prompt the user for which they'd like to bid on
            inquirer
              .prompt([
                {
                    type: 'input',
                    message: 'What role do you want to add?',
                    name: 'role',
                }
              ])
              .then((answer) => {
                    this.connection.query(
                        'INSERT INTO role SET ?',
                        {
                          name: `${answer.role}`
                        },
                        (err, res) => {
                          if (err) throw err;
                          console.log(`${answer.first} ${answer.last} was added!\n`);

                        }

                    )}
            )}
    )};
 



    removeRole(){

    };

    allDepartments(){
        return this.connection.query('SELECT * FROM department');
    };

    addDepartment(){
        this.connection.query('SELECT * FROM department', (err, results) => {
            if (err) throw err;
            // once you have the items, prompt the user for which they'd like to bid on
            inquirer
              .prompt([
                {
                    type: 'input',
                    message: 'What department do you want to add?',
                    name: 'department',
                }
              ])
              .then((answer) => {
                    this.connection.query(
                        'INSERT INTO department SET ?',
                        {
                          name: `${answer.department}`
                        },
                        (err, res) => {
                          if (err) throw err;
                          console.log(`${answer.first} ${answer.last} was added!\n`);

                        }

                    )}
            )}
    )};


    removeDepartment(){

    };

    quit() {
      connection.end();
    }


    //remove

}

module.exports = new DB(connection);