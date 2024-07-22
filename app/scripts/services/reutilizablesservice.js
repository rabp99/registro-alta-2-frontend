'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.reutilizablesService
 * @description
 * # reutilizablesService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('reutilizablesService', function ($resource, envService, trabajadoresService) {
    return $resource(envService.getHost() + 'reutilizables/:id.json', {}, {
        report: {
            method: 'GET',
            url: envService.getHost() + 'reutilizables/report.json'
        },
        liberar: {
            method: 'POST',
            url: envService.getHost() + 'reutilizables/liberar.json'
        },
        exportExcel: {
            method: 'POST',
            responseType: 'arraybuffer',
            transformResponse: function(data, headersGetter) {
                return { data : data };
            },
            url: envService.getHost() + 'reutilizables/exportExcel'
        },
        reportHistorial: {
            method: 'POST',
            responseType: 'arraybuffer',
            transformResponse: function(data, headersGetter) {
                return { data : data };
            },
            url: envService.getHost() + 'reutilizables/reportHistorial'
        },
        lavanderiaRegularizar: {
            method: 'POST',
            url: envService.getHost() + 'reutilizables/lavanderia_regularizar.json'
        },
        findEnVestidores: {
            method: 'GET',
            url: envService.getHost() + 'reutilizables/find_en_vestidores.json'            
        },
        registrarEnLavanderia: {
            method: 'POST',
            url: envService.getHost() + 'reutilizables/registrar_en_lavanderia.json'
        },
        findEnLavanderia: {
            method: 'GET',
            url: envService.getHost() + 'reutilizables/find_en_lavanderia.json'            
        },
        registrarDevolucion: {
            method: 'POST',
            url: envService.getHost() + 'reutilizables/registrar_devolucion.json'
        }
    });
});