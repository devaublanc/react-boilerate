import test from 'ava';

import Hello from '../Hello';

/*****************************************
***************** Hello *****************
******************************************/

test.beforeEach('cleanup', t => {
    t.context.Hello = new Hello();
});

test('indexOf', t => {
    t.plan(2);
    t.same(-1, [1,2,3].indexOf(5));
    t.same(-1, [1,2,3].indexOf(0));
});

test.cb('wait', t => {
    t.plan(1);
    setTimeout(() => {
        t.same(1, 1);
        t.end();
    }, 100);
});

test('should increment 10', (t) => {
    t.plan(1);
    const Hello = t.context.Hello;
    Hello.incrementAge(10);
    t.same(Hello.getAge(), 37);
});

test('should increment 20', (t) => {
    t.plan(1);
    const Hello = t.context.Hello;
    Hello.incrementAge(20);
    t.same(Hello.getAge(), 47);
});

test('should increment 30', (t) => {
    t.plan(1);
    const Hello = t.context.Hello;
    Hello.incrementAge(30);
    t.same(Hello.getAge(), 57);
});
