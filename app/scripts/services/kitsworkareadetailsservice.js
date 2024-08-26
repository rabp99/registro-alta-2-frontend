'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.kitsWorkAreaDetailsService
 * @description
 * # kitsWorkAreaDetailsService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('kitsWorkAreaDetailsService', function ($resource, envService) {
        var endpointUrl = 'kits-work-area-details';
        return $resource(envService.getHost() + endpointUrl + '/:id.json', {}, {
            getKitsByWorkAreaDetail: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/get-kits-by-work-area-detail/:work_area_detail_id.json'
            },
        });
    });