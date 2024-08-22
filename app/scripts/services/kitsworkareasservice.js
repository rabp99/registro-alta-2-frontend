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
        let url = 'kits-work-areas';
        return $resource(envService.getHost() + url + '/:id.json', {}, {
            getKitsByWorkArea: {
                method: 'GET',
                url: envService.getHost() + url + '/get-kits-by-work-area/:workplace_id/:work_area_id.json'
            },
        });
    });