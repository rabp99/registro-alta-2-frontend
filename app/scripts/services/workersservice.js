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
        let url = 'workers';
        return $resource(envService.getHost() + url + '/:id.json', {}, {
            findByDocument: {
                method: 'GET',
                url: envService.getHost() + url + '/find-by-document/:document_type/:document_number.json'
            },


            findByDni: {
                method: 'GET',
                url: envService.getHost() + url + '/find_by_dni/:dni.json'
            },
            getEnabled: {
                method: 'GET',
                url: envService.getHost() + url + '/get_enabled.json'
            },
            checkColaboradorProgramadoHoy: {
                method: 'GET',
                url: envService.getHost() + url + '/check-colaborador-programado-hoy/:dni_medico.json'
            }
        });
    });