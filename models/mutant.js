'use strict'

var mongoose =  require('mongoose');
var utils = require('../helpers/utils');
var { directions } = require('../helpers/directions');

var Schema = mongoose.Schema;

/**
 * Required repetitions to consider pattern
 *
 * @type {number}
 */
const requiredRepetitions = 4;

/**
 * Minimun occurrences of the patterns
 *
 * @type {number}
 */
const minimunOccurrences = 2;

/**
 * Occurrences counter
 *
 * @type {number}
 */
var occurrencesCounter;

/**
 * This will have the different coordinates to
 * avoid on the different directions
 */
var avoidPossitionsInDiretions;

// Create mutant schema
const MutantSchema = Schema({

});

/**
 * Given an array of strings in dna variable the function
 * will determinate if DNA sequence belongs to a mutant
 * based on the following premise:
 *  - Sabrás si un humano es mutante, si encuentras ​
 *      más de una secuencia de cuatro letras
 *      iguales​ , de forma oblicua, horizontal o vertical.
 *
 * @param dna
 * @returns {boolean}
 */
MutantSchema.statics.isMutant = function(dna)
{

    occurrencesCounter = 0;
    avoidPossitionsInDiretions = {};
    var dnaMatrix = utils.createMatrix(dna);

    var i = 0;
    var j = 0;

    // Initialize positions to avoid on different directions as empty arrays
    avoidPossitionsInDiretions['right']                 = [];
    avoidPossitionsInDiretions['right-oblique-down']    = [];
    avoidPossitionsInDiretions['down']                  = [];
    avoidPossitionsInDiretions['left-oblique-down']     = [];

    utils.log("OccurrencesCounter: " + occurrencesCounter);
    utils.log("MinimunOccurrences: " + minimunOccurrences);

    while ((i < dnaMatrix.length) && (occurrencesCounter < minimunOccurrences)) {

        j = 0;
        
        while ((j < dnaMatrix[0].length) && (occurrencesCounter < minimunOccurrences)) {

            occurrencesCounter += searchInDirection(dnaMatrix, i, j, 'right');
            occurrencesCounter += searchInDirection(dnaMatrix, i, j, 'right-oblique-down');
            occurrencesCounter += searchInDirection(dnaMatrix, i, j, 'down');
            occurrencesCounter += searchInDirection(dnaMatrix, i, j, 'left-oblique-down');

            utils.log("+++++++++++++++++++++++++++++++");
            utils.log("+++++++++++++++++++++++++++++++");
            utils.log("+++++++++++++++++++++++++++++++");

            j++;
        }

        utils.log("//////////////////////////////////");
        utils.log("//////////////////////////////////");
        utils.log("//////////////////////////////////");

        i++;
    }

    return (occurrencesCounter >= minimunOccurrences);
};

function searchInDirection(matrix, row, col, direction)
{
    utils.log("----------------------------------");
    utils.log("----------------------------------");
    utils.log("----------------------------------");

    utils.log("Row: " + row + "  ---  Col: " + col + "  ---  Direction: " + direction);

    // This is to avoid doing the check on each call
    if (occurrencesCounter >= minimunOccurrences) {
        utils.log("Already found minimum occurrences");
        return 0;
    }

    var searchedCoordinates = [];

    var rowLength = matrix.length;
    var colLength = matrix[0].length;

    var currentValue = matrix[row][col];
    utils.log("Current Value: " + currentValue);

    // We start in next position based on direction
    var currentRow = row + directions[direction]['row'];
    var currentCol = col + directions[direction]['col'];

    // This is the last possible value that can make the match
    // If is outside the matrix limits then return 0
    var lastPossibleRow = row + (directions[direction]['row'] * (requiredRepetitions - 1));
    var lastPossibleCol = col + (directions[direction]['col'] * (requiredRepetitions - 1));
    if ((lastPossibleCol >= colLength) || (lastPossibleRow >= rowLength)) {
        utils.log("Last possible row: " + lastPossibleRow + "  --  Last possible col: " + lastPossibleCol);
        utils.log("ColLength: " + colLength + "  --  RowLength: " + rowLength);
        utils.log("The possible 4th value is outside matrix so it will fail on search");
        return 0;
    }

    var occurrenceCounter = 0;
    var found = false;

    var count = 0;

    utils.log("Row: " + currentRow + "   ---  Col: " + currentCol);

    while ((currentRow >= 0) && (currentCol >= 0) && (currentRow < rowLength) && (currentCol < colLength) && (!found)) {
        // Get the matrix value at iterated position
        var value = matrix[currentRow][currentCol];

        // Define coordinate value as RowxCol
        var coordinate = currentRow + "x" + currentCol;
        if (avoidPossitionsInDiretions[direction].indexOf(coordinate) !== -1) {
            utils.log("We need to avoid this possition");
            break
        }

        // If values are different, then break
        if (currentValue !== value) {
            utils.log("Current Value different than previous: " + value);
            break;
        }

        // Values are same so we need to increment occurrence counter
        occurrenceCounter++;

        // This means that we have found 4 occurrences
        if (occurrenceCounter === (requiredRepetitions - 1)) {
            utils.log("EUREKA!!! We found it!!");
            found = true;
            count = 1;
            break;
        }

        // Stores the searched occurrences
        searchedCoordinates.push(coordinate);

        // Move along in the right direction
        currentRow = currentRow + directions[direction]['row'];
        currentCol = currentCol + directions[direction]['col'];

        utils.log("Row: " + currentRow + "   ---  Col: " + currentCol);
    }

    if (found) {
        avoidPossitionsInDiretions[direction].concat(searchedCoordinates);
    }

    return count;
}

module.exports = mongoose.model('Mutant', MutantSchema);