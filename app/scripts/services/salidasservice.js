'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.salidasService
 * @description
 * # salidasService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('salidasService', function ($resource, envService) {
    return $resource(envService.getHost() + 'salidas/:id.json', {id: '@id'}, {});
});