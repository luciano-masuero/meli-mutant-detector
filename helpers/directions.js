'use strict'


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
}

