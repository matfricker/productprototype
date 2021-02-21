(function() {
    'use strict';

    angular
        .module('app')
        .factory('Users', function () {
            var Users = {};
            var userList = [
                { id: '1', firstname: 'Matt', lastName: 'Fricker' },
                { id: '2', firstname: 'Vanessa', lastName: 'Fricker' }
            ];

            Users.all = function() {
                return userList;
            }
            
            return Users;
        })
})();