(function() {
    'use strict';

    angular
        .module('app')
        .factory('YJWebService', YJWebService);
        
        YJWebService.$inject = ['$soap'];

        function YJWebService($soap) {

            var base_url = "http://wcf.prototype.co.uk/webservice.svc";

            return {
                HelloWorld: function() {
                    return "Hi";
                    //return $soap.post(base_url, "HelloWorld");
                }
            }
        }
})();