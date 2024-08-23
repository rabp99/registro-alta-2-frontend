'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.kitsWorkAreasService
 * @description
 * # kitsWorkAreasService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('kitsWorkAreasService', function ($resource, envService) {
        var endpointUrl = 'kits-work-areas';
        return $resource(envService.getHost() + endpointUrl + '/:id.json', {}, {
            getKitsByWorkArea: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/get-kits-by-work-area/:workplace_id/:work_area_id.json'
            },
        });
    });