const inquirer = require('inquirer');
const placeOrder = require('./customer');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'cli_store'
});

connection.connect();

inquirer
  .prompt({
    type: 'list',
    message: 'Who are you?',
    name: 'user',
    choices: ['Customer', 'Manager', 'Supervisor']
  })
  .then(answers => {
    const user = answers.user;
    console.log(user);
    switch (user) {
      case 'Customer':
        placeOrder();
        break;
      case 'Manager':
        break;
      case 'Supervisor':
        break;
      default:
        break;
    }
  });

// connection.query('select * from products', function(error, results, fields) {
//   if (error) throw error;
//   //console.log('The solution is: ', fields, results);
//   results.forEach(result => console.table(result));
// });

// connection.end();
