import require_condition from '../../../src/utils/condition'


test('It should do nothing on has condition', () => {
    expect(require_condition("mock","pre-condition")).toBeTruthy();
});

test('It should throws an Error when no conditions', () => {
    function testReq() {
        require_condition();
    }
    expect(testReq).toThrowError();
});