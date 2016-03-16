import chai from 'chai';
import { assert, should, expect } from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';

import Hello from '../Hello'
import Github from '../Github'

chai.use(chaiAsPromised);
should();

/*****************************************
***************** Hello *****************
******************************************/

describe('Hello', () => {

    describe('#indexOf()', () => {

        it('should return -1 when the value is not present', () => {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });

    });

    describe('#wait', () => {

        it('should wait async', (done) => {
            setTimeout(() => {
                assert.equal(1, 1);
                done();
            }, 50);
        });

    });


    describe('#hook', () => {

        let HelloTest = null;

        beforeEach(() => {
            HelloTest = new Hello();
        });

        it('should increment 10', () => {
            HelloTest.incrementAge(10);
            assert.equal(HelloTest.getAge(), 37);
        });

        it('should increment 20', () => {
            HelloTest.incrementAge(20);
            assert.equal(HelloTest.getAge(), 47);
        });

        it('should increment 30', () => {
            HelloTest.incrementAge(30);
            assert.equal(HelloTest.getAge(), 57);
        });

    });

    describe('#should', () => {

        it('should be equal 27 with should', () => {
            let HelloTest = new Hello();
            HelloTest.getAge().should.be.equal(27);
        });

    });

    describe('#expect', () => {

        it('should be equal 27 with expect', () => {
            let HelloTest = new Hello();
            expect(HelloTest.getAge()).be.equal(27);
        });

    });

});

/*****************************************
***************** Social *****************
******************************************/

describe('Github', () => {

    var url = '';
    var GithubTest = new Github();

    it('should have github_url', () => {
        expect(GithubTest.github_url).to.exist;
    });

    describe('#getFollowersCount', () => {

        afterEach(() => {
            if (GithubTest.callAPI.restore) {
                GithubTest.callAPI.restore();
            }
        });

        it('should be a function', () => {
            expect(GithubTest.getFollowersCount).to.be.a('function')
        });

        it('should call callAPI (sinon spy)', () => { // with spy you can listen a function
            sinon.spy(GithubTest, 'callAPI');
            GithubTest.getFollowersCount(url);
            expect(GithubTest.callAPI.withArgs(GithubTest.github_url + url).calledOnce).to.be.true
        });

        it('should return count (sinon stub)', function(done) { // with stub you can modify function
            this.timeout(5000);
            const stub = sinon.stub(GithubTest, 'callAPI');

            stub.returns(new Promise((resolve) => {
                resolve({count: 3});
            }));

            expect(GithubTest.getFollowersCount(url)).to.eventually.be.equal(3).notify(done);
        });

    });

    describe('#getContributionCount', () => { // with stub you can emulate a function

        it('should return contribution (sinon mock)', () => {
            const mock = sinon.mock(GithubTest);
            mock.expects('callAPI')
                .once()
                .withArgs(GithubTest.github_url + url);
                
            GithubTest.getContributionCount(url);
            mock.verify();
            mock.restore();
        })

    });

});
