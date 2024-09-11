'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.trabajadoresService
 * @description
 * # trabajadoresService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('trabajadoresService', function ($resource, envService) {
    return $resource(envService.getSgperApi(), {}, {
        getByDni: {
            method: 'POST',
            transformResponse: function(data, headersGetter, status) {
                var response = angular.fromJson(data);
                if (response === null ) {
                    return response;
                }
                if (response.items.length > 0) {
                    return {trabajador: response.items[0]};
                } else {
                    return {trabajador: null};
                }
            }
        },
        search: {
            method: 'POST',
            transformResponse: function(data, headersGetter, status) {
                var response = angular.fromJson(data);
                return {trabajadores: response.items};
            }
        },
        getAll: {
            method: 'POST',
            transformRequest: function(data, headersGetter, status) {
                return angular.toJson({texto: ''});
            },
            transformResponse: function(data, headersGetter, status) {
                var response = angular.fromJson(data);
                return {trabajadores: response.items};
            }
        }
    });
});