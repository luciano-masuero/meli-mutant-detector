'use strict'

const { config } = require('../config');


/**
 * Receives an array of strings and returns the
 * matrix generated
 *
 * @param stringArray
 * @returns {Array}
 */
module.exports.createMatrix = function(stringArray) {

    var matrix = [];
    var x = stringArray.length;
    var y = stringArray[0].length;

    for (var i = 0; i < x; i++) {
        matrix[i] = [];
        for (var j = 0; j < y; j++) {
            matrix[i][j] = stringArray[i][j];
        }
    }

    return matrix;
};


/**
 * If we are on debug mode then log
 *
 * @param string
 * @returns {Array}
 */
module.exports.log = function(string) {
    if (config.debug) {
        console.log(string);
    }
};
