/**
* @descripción Módulos, archivos y servicios REST usados por el servidor
* @autor Adrián Sánchez <contact@imaginexyz.com>
*/

//Módulos Necesitados
var express = require('express'), //Biblioteca para permitir servicios REST
    cookieParser = require('cookie-parser'), 
    bodyParser = require('body-parser'); //Biblioteca para manejar los datos de las solicitudes

//REST APIS
var  database = require('./services/database'); //Archivo donde vamos a comunicarnos con la base de datos

var app = express(); //Instancia de express
app.use(express.logger('dev')); //Método de ver los mensajes en consola
app.use(bodyParser());

//Servicios REST permitidos
app.get('/pose', database.getData);  //GET
app.post('/pose', database.editData); //POST (realmente es un PUT)
//app.put('/pose', database.newData); //PUT (tiene asignado el POST pero no se ocupa)
app.delete('/pose', database.removeData); //DELETE

//Redirección por defecto
app.get('*', function (req, res) {
    res.redirect('../#home', 404);
});

//Habilitar puerto de escucha para el servidor
var port = Number(process.env.PORT || 3000);
app.listen(port);
console.log('Listening on port ' + port + '...');