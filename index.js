const inquirer = require('inquirer');
const placeOrder = require('./customer');
const managerView = require('./manager');
const supervisorView = require('./supervisor');

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
        managerView();
        break;
      case 'Supervisor':
        supervisorView();
        break;
      default:
        break;
    }
  });
