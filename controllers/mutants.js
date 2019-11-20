'use strict'

// Cargamos los modelos para usarlos posteriormente
const Mutant = require('../models/mutant');

const async = require('async');


var utils = require('../helpers/utils');

module.exports.isMutant = async function(req, res) {

    try {

        if (!req.body || !req.body.dna) {
            return res.status(403).send('Forbidden');
        }

        var dna = req.body.dna;

        // Check that we have received a proper array
        if (!Array.isArray(dna)) {
            return res.status(403).send('Forbidden');
        }

        var flattenDna = utils.flattenArray(dna);

        var mutant = await Mutant.findOne({ flattedDna: flattenDna });

        if (mutant) {
            utils.log("DNA is already on db so its valid");
            return res.status(200).send('Ok');
        }

        utils.log("DNA does not exist in DB so we have to check it");

        // Check for this new mutant detection
        if (!Mutant.isMutant(dna)) {
            utils.log("DNA does not belong to mutant");
            return res.status(403).send('Forbidden');
        }

        utils.log("DNA belongs to a new mutant!");

        //Save the mutant DNA
        var newMutant = new Mutant(
            {
                flattedDna : flattenDna,
                dna: dna
            }
        );

        await newMutant.save();
        utils.log("New Mutant saved at db");

        return res.status(200).send('Ok');

    } catch (error) {
        return res.status(403).send('Forbidden');
    }

};
