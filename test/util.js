const assert = require('assert');

var utils = require('../helpers/utils');

describe('Utils', function() {

    describe('createMatrix', function() {

        it('Should return the proper matrix given the array of strings', function() {

            var dna = [
                "AT",
                "CG"
            ];
            var matrix = [
                ["A", "T"],
                ["C", "G"]
            ];
            assert.deepEqual(utils.createMatrix(dna), matrix);
        });

        it('Should return the proper matrix given the array of strings', function() {

            var dna = [
                "ATAC",
                "CGCG",
                "CGCG",
                "CGCG"
            ];
            var matrix = [
                ["A", "T", "A", "C"],
                ["C", "G", "C", "G"],
                ["C", "G", "C", "G"],
                ["C", "G", "C", "G"],
            ];

            assert.deepEqual(utils.createMatrix(dna), matrix);
        });
    });
});