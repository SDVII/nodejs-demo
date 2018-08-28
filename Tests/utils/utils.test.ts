import "mocha";
import {
    expect
} from 'chai';
import {
    add,
    square,
    asyncAdd
} from './utils';

//group tests with describe
describe("Utils", () => {

    // you can nest it too
    describe('#add', () => {
        it('should add two numbers', () => {
            let res = add(33, 11);
            expect(res)
                .to.equal(44)
                .to.be.a('number');
        });

        it('should add two numbers in async', () => {
            asyncAdd(1, 2).then((res: any) => {
                expect(res).to.equal(3);
            })
        });

    })

    it('should return the square of a number', () => {
        let res = square(3)
        expect(res)
            .to.equal(9)
            .to.be.a('number');
    });

    it('should expect a certain value', () => {
        //better to assert equality than not
        expect(12).to.not.equal(11);
    });

    it('should expect a certain object', () => {
        expect({
            name: 'houmam'
        }).to.deep.equal({
            name: 'houmam'
        });
    });

    it('should include a certain element', () => {
        expect([1, 2, 7]).to.include(7);
    });

    it('should include a certain paramter', () => {
        expect({
            name: "houmam",
            age: 23
        }).to.include({
            age: 23
        });
    });

})