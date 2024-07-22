'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.solicitudesService
 * @description
 * # solicitudesService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('solicitudesService', function ($resource, envService, trabajadoresService) {
    return $resource(envService.getHost() + 'solicitudes/:id.json', {}, {
        findSolicitudes: {
            method: 'GET',
            url: envService.getHost() + 'solicitudes/find_solicitudes/:dni_medico.json'            
        },
        entregar: {
            method: 'POST',
            url: envService.getHost() + 'solicitudes/entregar.json'            
        },
        saveEntrega: {
            method: 'POST',
            url: envService.getHost() + 'solicitudes/save_entrega.json'
        },
        findLastEntregas: {
            method: 'GET',
            url: envService.getHost() + 'solicitudes/find_last_entregas/:dni_medico/:numero.json'
        },
        report: {
            method: 'GET',
            url: envService.getHost() + 'solicitudes/report.json'
        },
        exportExcel: {
            method: 'POST',
            responseType: 'arraybuffer',
            transformResponse: function(data, headersGetter) {
                return { data : data };
            },
            url: envService.getHost() + 'solicitudes/exportExcel'
        },
        exportCsv: {
            method: 'POST',
            responseType: 'arraybuffer',
            transformResponse: function(data, headersGetter) {
                return { data : data };
            },
            url: envService.getHost() + 'solicitudes/exportCsv'
        },
        reportAnexo3: {
            method: 'POST',
            responseType: 'arraybuffer',
            transformResponse: function(data, headersGetter) {
                return { data : data };
            },
            url: envService.getHost() + 'solicitudes/reportAnexo3'
        },
        reportAnexo4: {
            method: 'POST',
            responseType: 'arraybuffer',
            transformResponse: function(data, headersGetter) {
                return { data : data };
            },
            url: envService.getHost() + 'solicitudes/reportAnexo4'
        },
        reportCuadroResumen: {
            method: 'POST',
            responseType: 'arraybuffer',
            transformResponse: function(data, headersGetter) {
                return { data : data };
            },
            url: envService.getHost() + 'solicitudes/reportCuadroResumen'
        },
        reportCuadroResumenCsv: {
            method: 'POST',
            responseType: 'arraybuffer',
            transformResponse: function(data, headersGetter) {
                return { data : data };
            },
            url: envService.getHost() + 'solicitudes/reportCuadroResumenCsv'
        },
        reportCuadroResumenDiario: {
            method: 'POST',
            responseType: 'arraybuffer',
            transformResponse: function(data, headersGetter) {
                return { data : data };
            },
            url: envService.getHost() + 'solicitudes/reportCuadroResumenDiario'
        },
        reportCuadroResumenDiarioCsv: {
            method: 'POST',
            responseType: 'arraybuffer',
            transformResponse: function(data, headersGetter) {
                return { data : data };
            },
            url: envService.getHost() + 'solicitudes/reportCuadroResumenDiarioCsv'
        },
        reportReporteSemanal: {
            method: 'POST',
            responseType: 'arraybuffer',
            transformResponse: function(data, headersGetter) {
                return { data : data };
            },
            url: envService.getHost() + 'solicitudes/reportReporteSemanal'
        },
        reportReporteSemanalCsv: {
            method: 'POST',
            responseType: 'arraybuffer',
            transformResponse: function(data, headersGetter) {
                return { data : data };
            },
            url: envService.getHost() + 'solicitudes/reportReporteSemanalCsv'
        },
        remove: {
            method: 'POST',
            url: envService.getHost() + 'solicitudes/remove.json'
        },
        removeBd: {
            method: 'POST',
            url: envService.getHost() + 'solicitudes/remove_bd.json'
        }
    });
});