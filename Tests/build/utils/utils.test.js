"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var utils_1 = require("./utils");
//group tests with describe
describe("Utils", function () {
    // you can nest it too
    describe('#add', function () {
        it('should add two numbers', function () {
            var res = utils_1.add(33, 11);
            chai_1.expect(res)
                .to.equal(44)
                .to.be.a('number');
        });
        it('should add two numbers in async', function () {
            utils_1.asyncAdd(1, 2).then(function (res) {
                chai_1.expect(res).to.equal(3);
            });
        });
    });
    it('should return the square of a number', function () {
        var res = utils_1.square(3);
        chai_1.expect(res)
            .to.equal(9)
            .to.be.a('number');
    });
    it('should expect a certain value', function () {
        //better to assert equality than not
        chai_1.expect(12).to.not.equal(11);
    });
    it('should expect a certain object', function () {
        chai_1.expect({
            name: 'houmam'
        }).to.deep.equal({
            name: 'houmam'
        });
    });
    it('should include a certain element', function () {
        chai_1.expect([1, 2, 7]).to.include(7);
    });
    it('should include a certain paramter', function () {
        chai_1.expect({
            name: "houmam",
            age: 23
        }).to.include({
            age: 23
        });
    });
});
