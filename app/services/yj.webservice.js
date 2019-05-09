(function() {
    'use strict';

    angular
        .module('app')
        .factory('YJWebService', YJWebService);
        
        YJWebService.$inject = ['$soap'];

        function YJWebService($soap) {

            var base_url = "https://frikz-wcf.azurewebsites.net/webservice.svc";

            return {
                HelloWorld: function() {
                    //return "Hi";
                    return $soap.post(base_url, "HelloWorld");
                }
            }
        }
})();