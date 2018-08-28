"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var sinon_1 = __importDefault(require("sinon"));
var rewire_1 = __importDefault(require("rewire"));
var app = rewire_1.default('./app');
var should = chai_1.default.should(), expect = chai_1.default.expect;
describe("App", function () {
    var db = {
        saveUser: sinon_1.default.spy()
    };
    app.__set__('db', db);
    it('should call the spy correctly', function () {
        var spy = sinon_1.default.spy();
        spy();
        expect(spy.calledOnce).to.be.true;
    });
    it('should call save user with user Object', function () {
        var email = "h.h@h.com";
        var pass = "123";
        app.handleSignup(email, pass);
        console.log(db.saveUser.firstCall.args);
        expect(db.saveUser.firstCall.calledWith([{ email: email, pass: pass }])).to.be.true;
    });
});
