# E-commerce Back-end Template

- A basic 3 table MySQL back-end database ready to be connected to front-end code to serve a business's product data
- Walkthrough tutorial: https://drive.google.com/file/d/1XH-EWZe3IWwhG8vjKTDodfqkIB3dbhS_/view

### Installation

- Download files to local repository and open in code editor
- Run `touch .env` in your root directory to create environment variable file
- Input your personal mysql username, password, and the ecommerce_db in this syntax:
        `DB_USER= '<your-mysql-username'
         DB_PW= '<your-mysql-password'
         DB_NAME= 'ecommerce_db'`
- Run `mysql -u root -p` in your command terminal and input your mysql password to enter the shell
- Run `source db/schema.sql`, then `quit` to exit the mysql shell
- Run `npm run seed` to seed the database, and `npm run start` to start the server and database connection
- The database is now able to interacted with via a front-end with the fetch api

### Usage

- Database features object relational mapping to manage an example of categories, products, and tags, that an e-commerce brand might utilize
- Easily accessible using the fetch api to manipulate using CRUD operations for each of the 3 main models
- Flexible routing allows varying data to be returned by each request 

