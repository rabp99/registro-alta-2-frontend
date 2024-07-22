'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.areasService
 * @description
 * # areasService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('areasService', function ($resource, envService) {
    return $resource(envService.getHost() + 'areas/:id.json', {id: '@id'}, {});
});