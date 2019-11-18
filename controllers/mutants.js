'use strict'

// Cargamos los modelos para usarlos posteriormente
const Mutant = require('../models/mutant');


module.exports.isMutant = function(req, res) {

    if (req.body && req.body.dna) {
        var dna = req.body.dna;

        console.log(dna);

        if (Array.isArray(dna)) {
            if (Mutant.isMutant(dna)) {
                return res.status(200).send('Ok');
            }
        }
    }

    return res.status(300).send('Forbidden');

};

