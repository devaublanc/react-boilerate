import test from 'ava';
import sinon from 'sinon';

import Github from '../Github';

/*****************************************
***************** Social *****************
******************************************/

var GithubTest = new Github();
var url = '';

test.afterEach('cleanup', () => {
    if (GithubTest.callAPI.restore) {
        GithubTest.callAPI.restore();
    }
});

test('should be a function', t => {
    t.plan(1);
    t.same((typeof GithubTest.getFollowersCount), 'function');
});

test('should call callAPI (sinon spy)', t => { // with spy you can listen a function
    sinon.spy(GithubTest, 'callAPI');
    GithubTest.getFollowersCount(url);
    t.true(GithubTest.callAPI.withArgs(GithubTest.github_url + url).calledOnce);
});

test.cb('should return count (sinon stub)', t => { // with spy you can listen a function
    const stub = sinon.stub(GithubTest, 'callAPI');
    stub.returns(new Promise((resolve) => {
        resolve({count: 3});
    }));

    GithubTest.getFollowersCount(url).then((result) => { // with stub you can emulate a function
        t.same(result, 3);
        t.end();
    });
});

test('getHello have to be mocked (sinon mock)', t => {  // with mock you can emulate a function

    const mock = sinon.mock(GithubTest);

    mock.expects('getName').once().returns('benjamin');

    t.same(GithubTest.getHello(), 'Hello benjamin');

    mock.verify();
    mock.restore();

});
