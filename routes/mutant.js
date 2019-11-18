'use strict'

// Cargamos el módulo de express para poder crear rutas
const express = require('express');

// Cargamos el controlador
const MutantsController = require('../controllers/mutants');

// Llamamos al router
const api = express.Router();

api.post('/mutant/', MutantsController.isMutant);

// Exportamos la configuración
module.exports = api;