(function(){
    'use strict';

    describe('BicycleServices factory', function() {
        var BicycleServices;

        beforeEach(angular.mock.module('app'));

        beforeEach(angular.mock.inject(function(_BicycleServices_){
            BicycleServices = _BicycleServices_;
        }));

        it('should exsit', function() {
            expect(BicycleServices).toBeDefined();
        })
    });

})();