const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'cli_store'
});

connection.connect();

const supervisorView = () => {
  inquirer
    .prompt({
      type: 'list',
      message:
        'Hi Supervisor! What would you like to view product sales by department?',
      name: 'action',
      choices: ['Yes', 'No']
    })
    .then(answers => {
      const action = answers.action;
      if (action === 'No') {
        console.log('Welp, good bye');
        process.exit();
      } else {
        connection.query(
          `select d.department_name, p.product_sale, d.over_head_costs, coalesce(p.product_sale, 0) - coalesce(d.over_head_costs,0) as profit
            from departments as d
            join (select department_name, sum(product_sale) as product_sale from products group by department_name) as p
            on d.department_name = p.department_name`,
          (error, results) => {
            if (error) throw error;
            console.table(results);
            connection.end();
            process.exit();
          }
        );
      }
    });
};

module.exports = supervisorView;
