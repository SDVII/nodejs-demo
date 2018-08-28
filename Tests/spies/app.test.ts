import chai from "chai";
import sinon from "sinon";
import rewire from "rewire";
const app = rewire('./app');

const should = chai.should(),
expect = chai.expect;

describe("App", () => {

    let db = {
        saveUser: sinon.spy()
    };
    app.__set__('db', db);

    it('should call the spy correctly', () => {
        const spy = sinon.spy();
        spy();
        expect(spy.calledOnce).to.be.true;
    })

    it('should call save user with user Object',()=>{
        let email = "h.h@h.com";
        let pass = "123";

        app.handleSignup(email,pass);
        console.log(db.saveUser.firstCall.args);
        
        expect(db.saveUser.firstCall.calledWith([{email,pass}])).to.be.true;

    })
})