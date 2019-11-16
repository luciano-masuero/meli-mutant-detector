'use strict'

// Cargamos los modelos para usarlos posteriormente
var Mutant = require('../models/mutant');


module.exports.get = function(req, res) {

    return res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
    });
}

