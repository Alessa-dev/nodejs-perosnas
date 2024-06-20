const express = require('express');      
const ejs = require('ejs');
const sqlite3 = require('sqlite3');

const app = express();                                      //creates an instance of the Express application in Node.js

const port = process.env.PORT || 3000;                      //variable to store the port we want to use 

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

const db = new sqlite3.Database('./db/personas.db');


app.use(express.urlencoded({ extended: true }));


// **************************************************************HOMEPAGE*****************************************************//

app.get('/', (req, res) => {

    var myhead = "App de Registro de Personas";               //the title that will appear on the top 

    var tempbody = "temp_img"                                 //the include the loads the inner div 

    res.render('pages/read', { myhead: myhead, tempbody: tempbody});    //rendering and sending the variables to be used in the HTML

});

// ***************************************************************C R U D*****************************************************//

app.get('/read/:hid', (req, res) => {

    opcion = (req.params['hid']);                               //parameter received from the URL

    if (opcion == "c") {                                        //Create********************************************************

        var myhead = "Ingreso de Personas";                     //the title that will appear on the top 
        var tempbody = "temp_create"                            //the include the loads the inner div 
    
        res.render('pages/read', { myhead: myhead, tempbody: tempbody});    //rendering and sending the variables to be used in the HTML

        app.post('/create', (req, res) => {
            const { nombre, apellido, cedula, edad } = req.body;
            db.run("INSERT INTO personas (nombre, apellido, cedula, edad) VALUES (?, ?, ?, ?)", [nombre, apellido, cedula, edad], (err) => {
                if (err) {
                    console.error(err);
                } else {
                    res.redirect('/read/c');
                }
            });
        });

    }else if (opcion == "r" || opcion == "u" || opcion == "d"){    //Read/Update/Delete*********************************************

            var tempbody = "temp_items"

            if (opcion == "r") 
                { var tdhide = "hidden"; var edithide = "hidden"; var deletehide = "hidden"; var myhead = "Consulta de Personas";
                }else if 
                (opcion == "u") { var tdhide = ""; var edithide = ""; var deletehide = "hidden"; var myhead = "Actualización de Personas";
                }else if 
                (opcion == "d") { var tdhide = ""; var edithide = "hidden"; var deletehide = ""; var myhead = "Eliminación de Personas";
                }

            db.all("SELECT * FROM personas", (err, rows) => {
                if (err) {
                    console.error(err);
                } else{
                    res.render('pages/read', { personas: rows, myhead: myhead, tdhide: tdhide, edithide: edithide, deletehide: deletehide, tempbody: tempbody});
                }
            });
    }
});

// ***************************************************************UPDATE*****************************************************//

app.get('/editar/:id', (req, res) => {

    var myhead = "Edición de Personas";

    var tempbody = "temp_edit" 

    var id = req.params.id;

    db.get("SELECT * FROM personas WHERE id = ?", id, (err, row) => {
        if (err) {
            console.error(err);
        } else {
            res.render('pages/read', { persona: row, myhead: myhead, tempbody: tempbody });
        }
    });

});

app.post('/editar/:id', (req, res) => {

    var id = req.params.id;

    const { nombre, apellido, cedula, edad } = req.body;
    db.run("UPDATE personas SET nombre = ?, apellido = ?, cedula = ?, edad = ? WHERE id = ?", [nombre, apellido, cedula, edad, id], (err) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/read/u');
        }
    });

});

// ****************************************************************DELETE*******************************************************//

app.get('/eliminar/:id', (req, res) => {

    const id = req.params.id;

    db.run("DELETE FROM personas WHERE id = ?", id, (err) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/read/d');
        }
    });
});


// **************************************************************PORT CONNECTION*****************************************************//

app.listen(port, () => {
    console.log(`Aplicación web Registro de Usuarios en ejecución en el puerto ${port}`);
});