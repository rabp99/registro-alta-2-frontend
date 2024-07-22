'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.reutilizablesSolicitudesDetallesService
 * @description
 * # reutilizablesSolicitudesDetallesService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
  .factory('reutilizablesSolicitudesDetallesService', function ($resource, envService) {
    return $resource(envService.getHost() + 'reutilizables-solicitudes-detalles/:id.json', {}, {
        findEntregados: {
            method: 'GET',
            url: envService.getHost() + 'reutilizables-solicitudes-detalles/find_entregados/:dni_medico.json'            
        },
        findEntregadosSalida: {
            method: 'GET',
            url: envService.getHost() + 'reutilizables-solicitudes-detalles/find_entregados_salida/:dni_medico.json'            
        },
        findEnVestidores: {
            method: 'GET',
            url: envService.getHost() + 'reutilizables-solicitudes-detalles/find_en_vestidores.json'            
        },
        findEnLavanderia: {
            method: 'GET',
            url: envService.getHost() + 'reutilizables-solicitudes-detalles/find_en_lavanderia.json'            
        },
        devolver: {
            method: 'POST',
            url: envService.getHost() + 'reutilizables-solicitudes-detalles/devolver.json'            
        },
        devolverEnSalida: {
            method: 'POST',
            url: envService.getHost() + 'reutilizables-solicitudes-detalles/devolver_en_salida.json'            
        },
        registrarEnVestidores: {
            method: 'POST',
            url: envService.getHost() + 'reutilizables-solicitudes-detalles/registrar_en_vestidores.json'            
        },
        registrarEnLavanderia: {
            method: 'POST',
            url: envService.getHost() + 'reutilizables-solicitudes-detalles/registrar_en_lavanderia.json'            
        },
        registrarDevolucion: {
            method: 'POST',
            url: envService.getHost() + 'reutilizables-solicitudes-detalles/registrar_devolucion.json'            
        },
        findEntregadosVestidores: {
            method: 'GET',
            url: envService.getHost() + 'reutilizables-solicitudes-detalles/find_entregados_vestidores/:dni_medico.json' 
        }
    });
});