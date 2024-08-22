'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.workerMedicalSpecialitiesService
 * @description
 * # workerMedicalSpecialitiesService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('workerMedicalSpecialitiesService', function ($resource, envService) {
        let url = 'worker-medical-specialities';
        return $resource(envService.getHost() + url + '/:id.json', {}, {
            getList: {
                method: 'GET',
                url: envService.getHost() + url + '/get-list.json'
            },
        });
    });