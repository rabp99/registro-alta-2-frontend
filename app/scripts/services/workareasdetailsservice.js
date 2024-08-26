'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.workAreaDetailsService
 * @description
 * # workAreaDetailsService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('workAreaDetailsService', function ($resource, envService) {
        var endpointUrl = 'work-area-details';
        return $resource(envService.getHost() + endpointUrl + '/:id.json', {}, {
            getByWorkArea: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/get-by-work-area/:work_area_id.json'
            },
        });
    });