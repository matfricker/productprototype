(function() {
    'use strict'

    describe('Users factory', function() {
        var Users;
        var userList = [
            { id: '1', userName: 'matfricker', name: 'Matt', lastName: 'Fricker' },
            { id: '2', userName: 'vanessal', name: 'Vanessa', lastName: 'Fricker' }
        ];

        // before each test load 'app' module
        beforeEach(angular.mock.module('app'));

        // before each test set our injected Users factory (_Users_)
        // to our local Users variable
        beforeEach(angular.mock.inject(function(_Users_) {
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
                console.log('List of Users: ', Users.all());
                expect(Users.all()).toEqual(userList);
            })

            it('should have at least one user', function() {
                console.log('Number of Users: ' + Users.all().length);
                expect(Users.all().length).toBeGreaterThan(0); 
            })
        });
    });

})();