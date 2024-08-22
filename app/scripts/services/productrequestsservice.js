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
        let url = 'product-requests';
        return $resource(envService.getHost() + url + '/:id.json', {}, {
            getActiveByWorker: {
                method: 'GET',
                url: envService.getHost() + url + '/get-active-by-worker/:document_type/:document_number.json'
            },
        });
    });