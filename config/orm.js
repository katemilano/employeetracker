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

    managerN(input){
      return this.connection.query('SELECT * FROM employee where manager_id = "?"', [input]);
    }

    managerNames(){
      return this.connection.query('SELECT first_name, id FROM employee where manager_id IS NULL');
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
      return this.connection.query(
        'UPDATE employee SET ? WHERE ?',
        [
          {
            role_id: id,
          },
          {
            first_name: name,
          },
        ])
    };


    quit() {
      connection.end();
    }

}

module.exports = new DB(connection);