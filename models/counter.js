'use strict'

var mongoose =  require('mongoose');

var Schema = mongoose.Schema;

// Create mutant schema
const CounterSchema = Schema({
    entity : String,
    counter: Number
});

CounterSchema.statics.mutantDetected = async function()
{
    await this.updateOne(
        { entity : 'mutant' },
        { $inc: { counter: 1 } }
    )
};

CounterSchema.statics.humanDetected = async function()
{
    await this.updateOne(
        { entity : 'human' },
        { $inc: { counter: 1 } }
    )
};

module.exports = mongoose.model('Counter', CounterSchema);