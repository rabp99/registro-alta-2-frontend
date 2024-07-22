'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.oauthhttpinterceptor
 * @description
 * # oauthhttpinterceptor
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('oauthHttpInterceptor', function ($cookies, envService) {
    return {
        request: function (config) {
            if (config.url.search('https://dniruc.apisperu.com/api/v1/dni/') === -1 &&
                config.url.search(envService.getHost() + 'users/login.json') === -1) {
                config.headers.Authorization = 'Bearer ' + $cookies.get('registro-alta-token');
            }
            return config;
        }
    };
});