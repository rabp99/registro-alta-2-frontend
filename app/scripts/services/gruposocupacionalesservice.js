'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.gruposOcupacionalesService
 * @description
 * # gruposOcupacionalesService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('gruposOcupacionalesService', function ($resource, envService, trabajadoresService) {
    return $resource(envService.getHost() + 'grupos-ocupacionales/:id.json', {}, {
        getAllowShow: {
            method: 'GET',
            url: envService.getHost() + 'grupos-ocupacionales/get_allow_show.json'
        }
    });
});