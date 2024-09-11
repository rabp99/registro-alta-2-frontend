'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.programacionesService
 * @description
 * # programacionesService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('programacionesService', function ($resource, envService) {
    return $resource(envService.getHost() + 'programaciones/:id.json', {}, {
        load: {
            method: 'POST',
            url: envService.getHost() + 'programaciones/load.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        findAvailables: {
            method: 'GET',
            url: envService.getHost() + 'programaciones/find_availables/:dni_medico.json'
        },
        findToTrabajador: {
            method: 'GET',
            url: envService.getHost() + 'programaciones/find_to_trabajador/:dni_medico.json'
        },
        findEntregados: {
            method: 'GET',
            url: envService.getHost() + 'programaciones/find_entregados/:dni_medico.json'            
        },
        findEntregadosOnlyEntrada: {
            method: 'GET',
            url: envService.getHost() + 'programaciones/find_entregados_only_entrada/:dni_medico.json'            
        },
        solicitar: {
            method: 'POST',
            url: envService.getHost() + 'programaciones/solicitar.json'
        },
        entregar: {
            method: 'POST',
            url: envService.getHost() + 'programaciones/entregar.json'
        },
        registerEntrada: {
            method: 'POST',
            url: envService.getHost() + 'programaciones/register_entrada.json'            
        },
        registerSalida: {
            method: 'POST',
            url: envService.getHost() + 'programaciones/register_salida.json'            
        },
        registerBreakStart: {
            method: 'POST',
            url: envService.getHost() + 'programaciones/register_break_start.json'            
        },
        registerBreakFinal: {
            method: 'POST',
            url: envService.getHost() + 'programaciones/register_break_final.json'            
        },
        report: {
            method: 'GET',
            url: envService.getHost() + 'programaciones/report.json'            
        },
        exportExcel: {
            method: 'POST',
            responseType: 'arraybuffer',
            transformResponse: function(data, headersGetter) {
                return { data : data };
            },
            url: envService.getHost() + 'programaciones/exportExcel'
        }
    });
});