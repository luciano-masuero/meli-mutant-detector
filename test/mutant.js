const assert = require('assert');

const Mutant = require('../models/mutant');

describe('Mutant Model', function() {

    describe('isMutant', function() {

        it('Should return false because dna does not match repetitions', function() {

            var dna = [
                "AT",
                "CG"
            ];
            assert.equal(Mutant.isMutant(dna), false);
        });

        it('Should return false because dna does not match repetitions', function() {

            var dna = [
                "ATA",
                "CGG",
                "CGG"
            ];
            assert.equal(Mutant.isMutant(dna), false);
        });


        it('Should return true because dna does match repetitions', function() {

            var dna = [
                "ATAA",
                "CGGA",
                "CGGA",
                "AAAA"
            ];
            assert.equal(Mutant.isMutant(dna), true);
        });


        it('Should return true because dna does match repetitions', function() {

            var dna = [
                "ATAACTGCTG",
                "CGGAGTCGTC",
                "CGGACTGCTT",
                "AAAACTAGTC",
                "AAAACTAGTC",
                "AAAACTAGTC",
                "AAAACTAGTC",
                "AAAACTAGTC",
                "AAAACTAGTC",
                "AAAACTAGTC",
            ];
            assert.equal(Mutant.isMutant(dna), true);
        });


    });
});
