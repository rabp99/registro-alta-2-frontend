'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.usersService
 * @description
 * # usersService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('usersService', function ($resource, envService) {
    return $resource(envService.getHost() + 'users/:id.json', {id: '@id'}, {
        changePassword: {
            method: 'POST',
            url: envService.getHost() + 'users/changePassword.json'
        },
        changePasswordAdmin: {
            method: 'POST',
            url: envService.getHost() + 'users/change_password_admin.json'
        },
        login: {
            method: 'POST',
            url: envService.getHost() + 'users/login.json'
        },
        getByUsername: {
            method: 'GET',
            url: envService.getHost() + 'users/get_by_username/:username.json'
        }
    });
});