const inquier = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

// creates connection to database
const connection = mysql.createConnection(
  {
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  },
  console.log("( ͡° ͜ʖ ͡°) Hello!!!")
);

// Main Menu function that unlocks the array of choices
function mainMenu() {
  inquier
    .prompt([
      {
        type: "list",
        name: "answer",
        message: "Main Menu: Please Choose An Option ",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Deparments",
          "Add Department",
          "Exit",
        ],
      },
    ])
    .then(({ answer }) => {
      switch (answer) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Deparments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Exit":
          exit();
          break;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// Console  logs current employees
function viewAllEmployees() {
  connection.query(
    `SELECT 
     employee.id, 
     CONCAT (employee.first_name, " ", employee.last_name) AS name, 
     role.title, 
     role.salary,
     CONCAT (manager.first_name, " ", manager.last_name) AS manager,
     department.name AS department 
     FROM employee 
     JOIN role ON employee.role_id = role.id
     JOIN department ON role.department_id = department.id
     LEFT JOIN employee manager ON employee.manager_id = manager.id`,
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.table(result);
      mainMenu();
    }
  );
}

// Function to add users
function addEmployee() {
  inquier
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is your employees first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is your employees last name?",
      },
      {
        type: "input",
        name: "role",
        message: "What is your employess role id?",
      },
      {
        type: "input",
        name: "manager",
        message: "what is your employees manager id?",
      },
    ])
    .then((data) => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [data.firstName, data.lastName, data.role, data.manager],
        function (err, result) {
          if (err) throw err;
        }
      );
      connection.query(
        `SELECT 
                    employee.id, 
                    CONCAT (employee.first_name, " ", employee.last_name) AS name, 
                    role.title, 
                    role.salary,
                    CONCAT (manager.first_name, " ", manager.last_name) AS manager,
                    department.name AS department 
                    FROM employee 
                     JOIN role ON employee.role_id = role.id
                     JOIN department ON role.department_id = department.id
                     LEFT JOIN employee manager ON employee.manager_id = manager.id`,
        function (err, result) {
          console.table(result);
          mainMenu();
        }
      );
    });
}

// function to update roles
function updateRole() {
  inquier
    .prompt([
      {
        type: "input",
        name: "employee",
        message: "What is the id of the employee you'd like to update?",
      },
      {
        type: "input",
        name: "role",
        message:
          "What is the id of the new role you'd like to assign this employee",
      },
    ])
    .then((data) => {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [data.role, data.employee],
        function (err, result) {
          if (err) throw err;
        }
      );
      connection.query(
        `SELECT 
         employee.id, 
        CONCAT (employee.first_name, " ", employee.last_name) AS name, 
        role.title, 
        role.salary,
        CONCAT (manager.first_name, " ", manager.last_name) AS manager,
        department.name AS department 
        FROM employee 
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id`,
        function (err, result) {
            if (err) throw err;
          console.table(result);
          mainMenu();
        }
      );
    });
}

// console logs a table of all current roles
function viewAllRoles() {
  connection.query(
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id",
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.table(result);
      mainMenu();
    }
  );
}

// creates a new role and allows user to assign the role to a specific department 
function addRole() {
  inquier
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of your new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is this roles annual salary?",
      },
      {
        type: "input",
        name: "deptId",
        message: "What is this roles department id?",
      },
    ])
    .then((data) => {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);",
        [data.title, data.salary, data.deptId],
        function (err, result) {
          if (err) throw err;
          
        })
        connection.query(`SELECT 
        role.id, 
        role.title, 
        role.salary, 
        department.name AS department 
        FROM role 
        JOIN department 
        ON role.department_id = department.id`, function (err, result){
            if (err) throw err;
            console.table(result)
            mainMenu();
        })
    });
}

// console logs current departments 
function viewAllDepartments() {
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) {
      console.log(err);
    }
    console.table(result);
    mainMenu();
  });
}

// function to create a new department 
function addDepartment() {
  inquier
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your new department?",
      },
    ])
    .then((data) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [data.name],
        function (err, result) {
          if (err) throw err;
          
        })

        connection.query('SELECT * FROM department', function (err,result){
            if (err) throw err;
            console.table(result);
            mainMenu();
        });
    });
}

// ends the program
function exit() {
  console.log("(>‿◠)✌ Adios!");
  process.exit();
}

mainMenu();