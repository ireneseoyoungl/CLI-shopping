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

const managerView = () => {
  inquirer
    .prompt({
      type: 'list',
      message: 'Hi Manager! What would you like to do?',
      name: 'action',
      choices: [
        'View products for sale',
        'View low inventory',
        'Add to inventory',
        'Add new product'
      ]
    })
    .then(answers => {
      const action = answers.action;
      switch (action) {
        case 'View products for sale':
          viewProductForSale();
          break;
        case 'View low inventory':
          viewLowInventory();
          break;
        case 'Add to inventory':
          addToInventory();
          break;
        case 'Add new product':
          addNewProduct();
          break;
      }
    });

  const viewProductForSale = () => {
    connection.query(
      'select id, prod_name, department_name, price, stock_quantity from products',
      (error, results) => {
        if (error) throw error;
        console.table(results);
        connection.end();
        process.exit();
      }
    );
  };
};

const viewLowInventory = () => {
  connection.query(
    'select id, prod_name, department_name, price, stock_quantity from products where stock_quantity<5',
    (error, results) => {
      if (error) throw error;
      console.table(results);
      connection.end();
      process.exit();
    }
  );
};

const addToInventory = () => {
  inquirer
    .prompt({
      type: 'input',
      message: "Add inventory in the format of 'product_name, quantity'",
      name: 'AddInv'
    })
    .then(answers => {
      const orderArr = answers.AddInv.split(',').map(answer => answer.trim());
      const product_name = orderArr[0];
      const quantity = orderArr[1];
      connection.query(
        'update products set stock_quantity =  stock_quantity +' +
          quantity +
          " where prod_name='" +
          product_name +
          "'",
        (error, results) => {
          if (error) throw error;
          console.log('Inventory has been added');
          connection.end();
          process.exit();
        }
      );
    });
};

const addNewProduct = () => {
  inquirer
    .prompt({
      type: 'input',
      message:
        'Which new product do you want to add? Format in prod_name, department_name, price, stock_quantity',
      name: 'newProd'
    })
    .then(answers => {
      const newProd = answers.newProd.split(', ');
      const prod_name = newProd[0];
      const department_name = newProd[1];
      const price = newProd[2];
      const stock_quantity = newProd[3];
      connection.query(
        'insert into products (prod_name, department_name, price, stock_quantity) values (?, ?, ?, ?)',
        [prod_name, department_name, price, stock_quantity],
        (error, results) => {
          if (error) throw error;
          console.log('Product has been added');
          connection.end();
          process.exit();
        }
      );
    });
};

module.exports = managerView;
