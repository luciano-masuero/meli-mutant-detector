'use strict'

const { config } = require('./config');

// Cargamos el módulo de mongoose para poder conectarnos a MongoDB
const mongoose = require('mongoose');

const app = require('./app');

console.info("Remember to run NVM use!");

// Le indicamos a Mongoose que haremos la conexión con Promesas
// mongoose.Promise = global.Promise;

// Usamos el método connect para conectarnos a nuestra base de datos
mongoose.connect("mongodb://" + config.mongo.domain + ":" + config.mongo.port + "/" + config.mongo.db,  { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => {
        // Cuando se realiza la conexión, lanzamos este mensaje por consola
        console.log("La conexión a la base de datos " + config.mongo.db + " se ha realizado correctamente")

        // CREAR EL SERVIDOR WEB CON NODEJS
        app.listen(config.app.port, () => {
            console.log("Servidor corriendo en " + config.app.domain + ":" + config.app.port);
        });
    })
    // Si no se conecta correctamente escupimos el error
    .catch(err => console.log(err));