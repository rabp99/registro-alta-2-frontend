'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.personasService
 * @description
 * # personasService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('personasService', function ($resource, envService) {
    return $resource(envService.getUrlApisPeru() + ':dni?token=' + envService.getTokenApisPeru(), {dni: '@dni'}, {});
});