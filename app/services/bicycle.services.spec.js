describe('Bicycle Factory', function() {
    it('has a dummy spec to test 2 + 2', function() {
        // intentionally failed test. No code in expect() will ever equal 4.
        expect().toEqual(4)
    })
    
    it('has a dummy spec to test 2 + 2', function() {
        // intentionally pass test.
        expect(2 + 2).toEqual(4)
    })
});