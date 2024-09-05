'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.reportsService
 * @description
 * # reportsService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('reportsService', function ($resource, envService) {
        var endpointUrl = 'reports';
        return $resource(envService.getHost() + endpointUrl + '/:id.json', {}, {
            getProductRequestRecordsData: {
                method: 'GET',
                url: envService.getHost() + endpointUrl + '/get-product-request-records-data/:worker_document_type/:worker_document_number/:start_date/:end_date.json'
            },
            getProductRequestRecordsFile: {
                method: 'GET',
                responseType: 'arraybuffer',
                transformResponse: function(data, headersGetter, status) {
                    if (status === 200) {
                        return { data: data };
                    }
                    
                    var decodedString = String.fromCharCode.apply(null, new Uint8Array(data));
                    try {
                        var json = JSON.parse(decodedString);
                        return json;
                    } catch (e) {
                        return decodedString;
                    }
                },
                url: envService.getHost() + endpointUrl + '/get-product-request-records-file/:worker_document_type/:worker_document_number/:start_date/:end_date.json'
            },
        });
    });