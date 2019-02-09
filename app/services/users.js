(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('Users', function () {
            var Users = {};
            var userList = [
                { id: '1', userName: 'matfricker', name: 'Matt', lastName: 'Fricker' },
                { id: '2', userName: 'vanessal', name: 'Vanessa', lastName: 'Fricker' }
            ];

            Users.all = function() {
                return userList;
            }
            
            return Users;
        })
})();