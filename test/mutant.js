const assert = require('assert');

const Mutant = require('../models/mutant');

// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app  = require('../app');

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

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Mutant Controller', function() {

    describe('POST /mutant/', function() {

        it('Should return Forbidden because dna does not match repetitions', function() {
            var dna = [
                "ATA",
                "CGG",
                "CGG"
            ];

            chai.request(app)
                .post('/mutant/')
                .type('json')
                .send({
                    'dna': dna,
                })
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                });

        });


        it('Should return Forbidden because dna does not match repetitions', function() {
            var dna = [
                "ATAGC",
                "CGGRT",
                "CGGAS",
                "CTGAS",
                "ZGGAS",
            ];

            chai.request(app)
                .post('/mutant/')
                .type('json')
                .send({
                    'dna': dna,
                })
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                });

        });



        it('Should return Forbidden because dna does not match repetitions', function() {
            var dna = [
                "ATAGC",
                "CGGRT",
                "CGZXT",
                "CTGAT",
                "ZGGAT",
            ];

            chai.request(app)
                .post('/mutant/')
                .type('json')
                .send({
                    'dna': dna,
                })
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                });

        });

        it('Should return OK because dna does match repetitions', function() {
            var dna = [
                "ATAGC",
                "CGGRT",
                "CGGAT",
                "CTGAT",
                "CGGAT"
            ];

            chai.request(app)
                .post('/mutant/')
                .type('json')
                .send({
                    'dna': dna,
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                });

        });


    });
});