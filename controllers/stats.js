'use strict'

// Cargamos los modelos para usarlos posteriormente
const Counter = require('../models/counter');

module.exports.get = async function(req, res) {

    try {

        var humanCounter = await Counter.findOne({ entity : 'human'});
        var mutantCounter = await Counter.findOne({ entity : 'mutant'});

        var response = {
            count_mutant_dna : mutantCounter.counter,
            count_human_dna : humanCounter.counter,
            ratio : (mutantCounter.counter / ( (humanCounter.counter == 0) ? 1 : humanCounter.counter ))
        };

        return res.status(200).send(response);

    } catch (error) {
        return res.status(403).send('Forbidden');
    }

};
