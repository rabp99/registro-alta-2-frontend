'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.colaboradoresService
 * @description
 * # colaboradoresService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('colaboradoresService', function ($resource, envService) {
        return $resource(envService.getHost() + 'colaboradores/:id.json', {}, {
            findByDni: {
                method: 'GET',
                url: envService.getHost() + 'colaboradores/find_by_dni/:dni.json'
            },
            getEnabled: {
                method: 'GET',
                url: envService.getHost() + 'colaboradores/get_enabled.json'
            },
            checkColaboradorProgramadoHoy: {
                method: 'GET',
                url: envService.getHost() + 'colaboradores/check-colaborador-programado-hoy/:dni_medico.json'
            }
        });
    });