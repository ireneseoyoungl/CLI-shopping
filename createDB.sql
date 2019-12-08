DROP DATABASE IF EXISTS cli_store;
CREATE DATABASE cli_store;
USE cli_store;
DROP TABLE IF EXISTS products;
CREATE TABLE products(
    id INTEGER AUTO_INCREMENT NOT NULL,
    prod_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price float(2) NOT NULL,
    stock_quantity integer  NOT NULL,
    product_sale float(2) NULL,
    PRIMARY KEY(id)
);
DROP TABLE IF EXISTS departments;
CREATE TABLE departments(
    department_id INTEGER AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs float(2) NOT NULL,
    PRIMARY KEY(department_id)
);
INSERT INTO products (prod_name, department_name, price, stock_quantity)
VALUES('shampoo', 'cosmetics', 5.99, 20)
, ('conditioner', 'cosmetics', 4.99, 15)
, ('dress', 'fashion', 50.00, 5)
, ('shirt', 'fashion', 30.00, 6)
, ('cereal', 'food', 3.99, 100)
, ('oatmeal', 'food', 3.50, 120);

INSERT INTO departments(department_name, over_head_costs)
VALUES('cosmetics', 100)
, ('fashion', 500)
, ('food', 80);

select * from products;
select * from departments;