'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.envService
 * @description
 * # envService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('envService', function () {
        return {
            getHost: function () {
                switch (window.location.hostname) {
                    /*
                    case 'localhost':
                        return 'https://registroalta.robertobocanegra.com/api/';
                    */
                    case 'localhost':
                        return 'http://localhost:8765/api/';

                    case '172.30.117.71':
                        return 'http://172.30.117.71:8765/api/';
                    case '172.27.58.40':
                        return 'https://registroalta.robertobocanegra.com/api/';
                    case 'ralta.ralalibertad.com':
                        return 'https://registroalta.robertobocanegra.com/api/';
                    case 'ralta.hacvp.com':
                        return 'https://registroalta.robertobocanegra.com/api/';
                    case '192.168.100.133':
                        return 'http://192.168.100.133/registro-alta/api/';
                    case 'staging.epps.hacvp.com':
                        return 'https://api.staging.epps.hacvp.com/api/';
                }
            },
            getFullHost: function () {
                switch (window.location.hostname) {
                    /*
                    case 'localhost':
                        return 'https://registroalta.robertobocanegra.com/';
                    */
                    case 'localhost':
                        return 'http://localhost:8765/';
                    case '172.30.117.71':
                        return 'http://172.30.117.71:8765/';
                    case '172.27.58.40':
                        return 'https://registroalta.robertobocanegra.com/';
                    case 'ralta.ralalibertad.com':
                        return 'https://registroalta.robertobocanegra.com/';
                    case 'ralta.hacvp.com':
                        return 'https://registroalta.robertobocanegra.com/';
                    case '192.168.100.133 ':
                        return 'https://192.168.100.133/registro-alta/api';
                    case 'staging.epps.hacvp.com':
                        return 'https://api.staging.epps.hacvp.com/api/';
                }
            },
            getDownloadHost: function () {
                switch (window.location.hostname) {
                    case 'localhost':
                        return 'http://localhost:8765/download/';
                    case '172.27.58.40':
                        return 'http://172.27.58.40:8080/registro-alta/api/download/';
                    case '192.168.100.133 ':
                        return 'https://192.168.100.133/registro-alta/api/download/';
                }
            },
            getUrlApisPeru: function () {
                return 'https://dniruc.apisperu.com/api/v1/dni/';
            },
            getTokenApisPeru: function () {
                return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJwcmE5MUBnbWFpbC5jb20ifQ.3AIngFJ9fVhr5wOeBVVJbc6ValHt2__oOYg97qXUh1o';
            },
            getSgperApi: function () {
                return 'http://172.27.58.61:8080/api.sgper/public/apifree/trabajador/getData1';
            },
            getWSHost: function() {
                switch (window.location.hostname) {
                    case 'localhost':
                        return 'ws://localhost:8766';
                    case 'staging.epps.hacvp.com':
                        return 'ws://api.staging.epps.hacvp.com:8766';
                }
            }
        };
    });