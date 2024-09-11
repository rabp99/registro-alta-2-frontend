'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:SupervisoresIndexCtrl
 * @description
 * # SupervisoresIndexCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('SupervisoresIndexCtrl', function ($scope, supervisoresService) {
    $scope.init = function() {
        $scope.tableSupervisores = {
            loading: false,
            count: 0,
            page: 1,
            pagination: {
                itemsPerPage: 10,
                totalItems: 0
            },
            pageChanged: function(page) {
                this.page = page;
                getSupervisores();
            }
        };
        $scope.search = {
            nro_documento: null
        };
        getSupervisores();
        $scope.supervisores = [];
    };
    
    var getSupervisores = function() {
        $scope.tableSupervisores.loading = true;
        supervisoresService.get({
            nro_documento: $scope.search.nro_documento,
            page: parseInt($scope.tableSupervisores.page),
            itemsPerPage: $scope.tableSupervisores.pagination.itemsPerPage
        },function(data) {
            $scope.supervisores = data.supervisores;
            $scope.tableSupervisores.loading = false;
            $scope.tableSupervisores.count = data.count;
            $scope.tableSupervisores.pagination = data.pagination;
        });
    };
    
    $scope.searchSupervisores = function() {
        $scope.tableSupervisores.page = 1;
        getSupervisores();
    };
    
    $scope.init();
});