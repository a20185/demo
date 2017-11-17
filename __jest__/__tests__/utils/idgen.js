import IDGenerator from '../../../src/utils/idgen'

let idGen = new IDGenerator();

test('IDGenerator should auto Increment', () => {
    var prev = idGen.next();
    var curr = idGen.next();
    expect(curr - prev).toBe(1);
});

test('IDGenerator should never Exceed Limits', () => {
    for (var i = 0 ; i < 0xffff ; i++) {
        idGen.next();
    }
    expect(idGen.next()).toBeLessThan(0xffff);
});