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
        'SELECT * FROM employee INNER JOIN department ON employee.id = department.id where department.id = ?', [id]);
    }

    byManager(){
        return this.connection.query('SELECT * FROM employee where manager_id IS NULL');
    }

    managerN(manager){
      return this.connection.query('SELECT manager_id FROM employee where first_name = ?', [manager]);
    }

    managerNames(man){
      return this.connection.query('SELECT first_name FROM employee where manager_id IS NULL');
    }


    addEmployee(first, last, role, id){
        return this.connection.query('INSERT INTO employee SET ?',
            {
              first_name: first,
              last_name: last,
              role_id: role,
              manager_id: id
            }
        )
      }


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
        return this.connection.query('SELECT * FROM role');
    }

    addRoles(role, sal, id){
      return this.connection.query(
        'INSERT INTO role SET ?',
        {
          title: role,
          salary: sal,
          department_id: id
        }, 
    )};

    allDepartments(){
        return this.connection.query('SELECT * FROM department');
    };

    addDepartment(dep){
      return this.connection.query(
        'INSERT INTO department SET ?',
        {
          name: dep
        }, 
    )};

    updateEmployeeRole(id, name){
      return this.connection.query('UPDATE employee SET role_id = ? WHERE last_name = ?', [id, name])
    };


    quit() {
      connection.end();
    }


    //remove

}

module.exports = new DB(connection);