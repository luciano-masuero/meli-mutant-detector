'use strict'

// Cargamos el módulo de express para poder crear rutas
const express = require('express');

// Cargamos el controlador
const StatsController = require('../controllers/stats');

// Llamamos al router
const api = express.Router();

api.get('/stats', StatsController.get);

// Exportamos la configuración
module.exports = api;