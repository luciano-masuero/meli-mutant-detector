'use strict'

// Cargamos los modelos para usarlos posteriormente
const Mutant = require('../models/mutant');

const async = require('async');


var utils = require('../helpers/utils');

module.exports.isMutant = function(req, res) {

    if (req.body && req.body.dna) {
        var dna = req.body.dna;

        // Check that we have received a proper array
        if (Array.isArray(dna)) {

            var flattenDna = utils.flattenArray(dna);

            async.waterfall([

                // Get the mutant
                function(callback) {
                    Mutant.findOne(
                        { flattedDna: flattenDna },
                        (error, mutant) => {
                            if (error) {
                                callback(true, 500, error.message);
                            }

                            utils.log("Buscando en db el DNA");
                            return callback(null, mutant);
                        }
                    );
                },

                // If not exist on DB then check if its valid
                function(mutant, callback) {

                    if (mutant) {
                        utils.log("DNA is already on db so its valid");
                        return callback(true, 200, "Ok");
                    }

                    // Check for this new mutant detection
                    if (Mutant.isMutant(dna)) {

                        //Save the mutant DNA
                        var mutant = new Mutant(
                            {
                                flattedDna : flattenDna,
                                dna: dna
                            }
                        );

                        utils.log("Es mutante");
                        return callback(null, mutant);

                    } else {
                        utils.log("No Es mutante");
                        return callback(true, 403, 'Forbidden');
                    }
                },

                // Save new mutant
                function(newMutant, callback) {

                    newMutant.save(
                        (error, newMutant) => {
                            if (error) {
                                callback(true, 500, error.message);
                            }

                            utils.log("New Mutant saved at db");
                            return  callback(true, 200, "ok");
                        }
                    );
                },],

                function(end, code, message) {
                    return res.status(code).send(message);
                }
            );
        }
    } else {
        return res.status(403).send('Forbidden');
    }
};

