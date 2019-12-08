const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'cli_store'
});

const placeOrder = () => {
  inquirer
    .prompt({
      type: 'input',
      message:
        "Hi customer! Please place an order in the format of 'product_name, quantity'",
      name: 'order'
    })
    .then(answers => {
      const orderArr = answers.order.split(',').map(answer => answer.trim());
      const product_name = orderArr[0];
      const quantity = orderArr[1];
      console.log(
        `..... Checking inventory for ${quantity} counts of ${product_name}`
      );
      checkInventory(product_name, quantity);
    });
};

const checkInventory = (product_name, quantity) => {
  connection.query(
    'select * from products where prod_name=? and stock_quantity>= ?',
    [product_name, quantity],
    (error, results, fields) => {
      if (error) throw error;
      if (results.length > 0) {
        console.log(
          `Order placed! Your total is $${results[0].price * quantity}`
        );
        const newStock =
          parseInt(results[0].stock_quantity) - parseInt(quantity);
        connection.query(
          'update products set stock_quantity=? , product_sale = coalesce(product_sale, 0) + ? where prod_name=?',
          [newStock.toString(), results[0].price * quantity, product_name],
          (error, results, fields) => {
            if (error) throw error;
            console.log(`Inventory updated for ${results.changedRows} row`);
            connection.end();
            process.exit();
          }
        );
      } else {
        console.log(`Insufficient stock!`);
        connection.end();
        process.exit();
      }
    }
  );
};

module.exports = placeOrder;
