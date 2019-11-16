'use strict'

// Cargamos el módulo de express para poder crear rutas
var express = require('express');

// Cargamos el controlador
var MutantsController = require('../controllers/mutants');

// Llamamos al router
var api = express.Router();

api.get('/mutant/:id', MutantsController.get);

// Exportamos la configuración
module.exports = api;