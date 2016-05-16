/*
* @descripción Funciones relacionadas con la base de datos
* @autor Adrián Sánchez <contact@imaginexyz.com>
* MODIFICADO POR ROBERTO BOLAÑOS <93.robozu@gmail.com>
*/

var mongo = require('mongodb'); //Biblioteca para comunicarse con la base de datos MongoDB

//Puerto de conexión con la base de datos (no es el mismo de escucha del servidor)
var uristring = 
    process.env.MONGODB_URI || 
    process.env.MONGOHQ_URL || 
    process.env.MONGOLAB_URI||
    'mongodb://localhost/Prueba';

var db;

//Conexión con la base de datos
mongo.MongoClient.connect(uristring, function(err, database) {
    if(!err) {
        db = database; //Instancia de la base de datos
        console.log('Connected to the "Poseidon" database');
    }
    else{
        console.log(404, 'Error Connecting to the "Poseidon" database');
    }
});

/* Funciones CRUD Básicas */

//GET - READ
exports.getData = function(req,res) {    
    db.collection('Poseidon').find(req.query).toArray(
        function(error, doc){
            if(error) {
                throw error;
                res.send(400, error);
            }
            else{
                res.send(200, doc);
            }
        }
    )
}

/*
//POST- CREATE
exports.newData = function(req, res) {
    var resource = req.body;
    db.collection('Poseidon').insert(
        resource, 
        function(error, doc_project){
            if(error) {
                throw error;
                res.send(400, error);
            }
            else{
                res.send(200, resource);
            }
        }
    )
}
*/

//PUT - UPDATE
exports.editData = function(req, res) {
    var resource = req.body,
        id_sen = req.body.sensor,
        nconcent = parseFloat(req.body.concentracion),
        ntemp = parseFloat(req.body.temp),
        nvolt = parseFloat(req.body.voltaje);
    db.collection('Poseidon').update(
        { sensor:id_sen },
        {
            $push: {
                concentracion:nconcent,
                temp:ntemp,
                voltaje:nvolt
            }
        }, 
        {upsert: true, new: true},
        function(err, doc) {
            if(err) {
                throw err;
                res.send(400, err);
            }
            else{
                res.send(200, resource);
            }
        }
    );
}


//DELETE - DELETE
exports.removeData = function(req, res) {
    var id_sen = req.body.sensor;
    db.collection('Poseidon').findAndRemove(
        { sensor:id_sen },
        function(err, result) {
            if(err) {
                throw err;
                res.send(400, err);
            }
            else{
                res.send(200, result);
            }  
        }
    );
}