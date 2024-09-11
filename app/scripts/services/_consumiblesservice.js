'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.consumiblesService
 * @description
 * # consumiblesService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('consumiblesService', function ($resource, envService, trabajadoresService) {
    return $resource(envService.getHost() + 'consumibles/:id.json', {}, {
        getEnabled: {
            method: 'GET',
            url: envService.getHost() + 'consumibles/get_enabled.json'            
        },
        report: {
            method: 'POST',
            url: envService.getHost() + 'consumibles/report.json'            
        },
        saveStock: {
            method: 'POST',
            url: envService.getHost() + 'consumibles/save_stock.json'            
        }
    });
});