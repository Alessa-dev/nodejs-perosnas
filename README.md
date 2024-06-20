Recursos: 
Express.js | app.get() Request Function -> https://www.geeksforgeeks.org/express-js-app-get-request-function/
Express.js | app.post() Function -> https://www.geeksforgeeks.org/express-js-app-post-function/

Inserting Data Into an SQLite Table from a Node.js Application:
https://www.sqlitetutorial.net/sqlite-nodejs/insert/


CREATE TABLE personas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    apellido TEXT,
    cedula TEXT,
    edad INTEGER
);


Estructura de archivos y carpetas

- package.json
- package-lock.json
- server.js
- views/
    - pages/
      - main.ejs
      - read.ejs
    - templates/
      - temp_create.ejs
      - temp_edit.ejs
      - temp_head.ejs
      - temp_img.ejs
      - temp_menu.ejs
      - temp_items.ejs
      - temp_title.ejs
- public/
    - css/
      - style.css
    - src/
      - info.png
- db/
    - database.db


<!-- ******************************************** -->

Ejecuta npm init para crear el archivo package.json e instala las dependencias necesarias.

package.json

{
  "name": "projectale",
  "version": "1.0.0",
  "description": "Aplicación web CRUD con SQLite en Node.js",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "sqlite3": "^5.1.6"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}

> npm start      //run the server normally

> npm run dev    //run the server dinamically with nodemon


<!-- *************Variables******************* -->

Difference between `let` and `var` in JavaScript

*Variables declared by let are only available inside the block where they’re defined.
*Variables declared by var are available throughout the function in which they’re declared.

<!-- ***************Documentation******************* -->

Imports the Express framework, allowing you to create an instance of the
Express application and define routes, middleware, and other configurations

const express = require('express');      


Imports the EJS template engine, enabling you to render dynamic content in 
your views by embedding JavaScript code within HTML

const ejs = require('ejs');


Imports the SQLite3 module, which provides a simple interface for working with 
SQLite databases in a Node.js environment.

const sqlite3 = require('sqlite3');



const app = express();                                      //creates an instance of the Express application in Node.js

const port = process.env.PORT || 3000;                      //variable to store the port we want to connect to  



Tells Express to serve static files from the 'public' directory. Static files are 
typically things like stylesheets, images, and client-side JavaScript files. This 
line makes it so that if a request comes in for a file in the 'public' directory 
(e.g., 'public/style.css'), Express will serve that file directly.

app.use(express.static('public'));



Sets the 'views' directory for the application. In Express, 'views' usually refers to 
the directory where your template files (e.g., EJS or Pug files) are located. This line 
is specifying that the 'views' directory is located in the project's root directory under 
the 'views' folder.

app.set('views', './views');



Sets the view engine for your application. The view engine is responsible for rendering 
dynamic content on the server before sending it to the client. In this case, the view engine 
is EJS (Embedded JavaScript), which allows you to embed JavaScript code within your HTML templates.

app.set('view engine', 'ejs');




const db: This declares a constant variable named db. This variable will be used to interact with the SQLite database.

new sqlite3.Database('./db/personas.db'): This part creates a new instance of the Database class provided by the 
qlite3 library. It takes the path to the SQLite database file as an argument. In this case, the database file is named 
'personas.db' and is located in the 'db' directory of the project.

So, db is an SQLite database object connected to the specified database file. You can use methods and queries provided 
by the sqlite3 library to interact with the database, perform CRUD (Create, Read, Update, Delete) operations, and more.

const db = new sqlite3.Database('./db/personas.db');



It is for setting up middleware in an Express.js application. Specifically, it is configuring middleware to parse 
incoming requests with URL-encoded payloads. Let me break down the components:

app.use(): This is an Express.js method that is used to mount middleware functions in the application's request processing pipeline.

express.urlencoded({ extended: true }): This middleware is provided by the Express.js framework and is used to parse incoming requests 
with URL-encoded payloads. The extended: true option allows the values of any type to be extended (as opposed to just strings or arrays).

When a form is submitted in an HTML document with enctype="application/x-www-form-urlencoded", the data is sent as URL-encoded parameters 
in the body of the request. This middleware parses that data and makes it available in the req.body object of your route handlers.

This middleware is essential for handling form data submitted through POST requests in an Express.js application.

app.use(express.urlencoded({ extended: true }));



Start the Express.js web server and make it listen for incoming requests on a specified port.

app.listen(port, callback): This function starts the Express.js application on the specified port. The port variable typically 
holds the port number on which you want your server to listen. The callback function is optional and is executed once the server 
has started.

console.log(Aplicación web Registro de Usuarios en ejecución en el puerto ${port}): This line prints a message to the console, 
indicating that the web application for user registration is running and listening on the specified port. The message includes 
the port number for clarity.

When you run your Node.js application, this piece of code will be executed, and you'll see the log message in the console indicating 
that your server is up and running. Users can then access your application by navigating to the specified port in their web browsers.

app.listen(port, () => {
    console.log(`Aplicación web Registro de Usuarios en ejecución en el puerto ${port}`);
});






