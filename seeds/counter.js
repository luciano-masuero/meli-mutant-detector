'use strict'

// Cargamos los modelos para usarlos posteriormente
const Counter = require('../models/counter');

module.exports.seed = async function()
{
    var humanCounter = await Counter.findOne({ entity: 'human' });

    if (!humanCounter) {
        humanCounter = new Counter({
            entity: 'human',
            counter: 0
        });

        await humanCounter.save();
    }

    var mutantCounter = await Counter.findOne({ entity: 'mutant' });

    if (!mutantCounter) {
        mutantCounter = new Counter({
            entity: 'mutant',
            counter: 0
        });

        await mutantCounter.save();
    }
};