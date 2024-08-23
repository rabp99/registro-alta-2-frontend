'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.productRequestsService
 * @description
 * # productRequestsService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('productRequestsService', function ($resource, envService) {
        var endpointUrl = 'product-requests';
        return $resource(envService.getHost() + endpointUrl + '/:id.json', {}, {
            getActiveByWorker: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/get-active-by-worker/:document_type/:document_number.json'
            },
        });
    });