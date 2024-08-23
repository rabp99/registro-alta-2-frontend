'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.workersService
 * @description
 * # workersService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('workersService', function ($resource, envService) {
        var endpointUrl = 'workers';
        return $resource(envService.getHost() + endpointUrl + '/:id.json', {}, {
            findByDocument: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/find-by-document/:document_type/:document_number.json'
            },


            findByDni: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/find_by_dni/:dni.json'
            },
            getEnabled: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/get_enabled.json'
            },
            checkColaboradorProgramadoHoy: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/check-colaborador-programado-hoy/:dni_medico.json'
            }
        });
    });