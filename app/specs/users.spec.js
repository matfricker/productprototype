(function() {
    'use strict'

    describe('Users Factory', function() {
        var Users;
        var userList = [
            { id: '1', userName: 'matfricker', name: 'Matt', lastName: 'Fricker' },
            { id: '2', userName: 'vanessal', name: 'Vanessa', lastName: 'Fricker' }
        ];

        // before each test load 'yellowjersey' module
        beforeEach(angular.mock.module('app.services'));

        // before each test set our injected Users factory (_Users_)
        // to our local Users variable
        beforeEach(inject(function(_Users_) {
            Users = _Users_;
        }));

        // a simple test to verify that the Users factory exists
        it('should exist', function() {
            expect(Users).toBeDefined();
        })


        describe('.all()', function() {
            it('should exist', function() {
                expect(Users.all).toBeDefined();
            })

            it('should return a list of users', function() {
                console.log(Users.all());
                expect(Users.all()).toEqual(userList);
            })

            //it('should have at least one user', function() {
            //    expect(Users.length).toEqual(1); 
            //})
        });

        

    });

})();