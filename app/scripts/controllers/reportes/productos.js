'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ReportesProductosCtrl
 * @description
 * # ReportesProductosCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('ReportesProductosCtrl', function ($scope, consumiblesService, $utilsViewService) {
    $scope.init = function() {
        getConsumibles();
        $scope.inicio = true;
        
        $scope.tableProductos = {
            loading: false,
            count: 0,
            page: 1,
            pagination: {
                itemsPerPage: 10,
                totalItems: 0
            },
            pageChanged: function(page) {
                this.page = page;
                getProductos();
            }
        };
        
        $scope.search = {};
    };
    
    var getConsumibles = function() {
        consumiblesService.getEnabled(function(data) {
            $scope.consumibles = data.consumibles;
        });
    };
    
    var getProductos = function() {
        $scope.productos = [];
        $scope.tableProductos.loading = true;
        $scope.inicio = false;
        
        var fechaInicial = $utilsViewService.formatDateToSql($scope.pre_fecha_inicial);
        var fechaFinal = $utilsViewService.formatDateToSql($scope.pre_fecha_final);
        
        consumiblesService.report({
            consumible_id: $scope.search.consumible_id || '',
            dni: $scope.search.dni || '',
            fecha_inicial: fechaInicial || '',
            fecha_final: fechaFinal || '',
            
            page: $scope.tableProductos.page,
            itemsPerPage: $scope.tableProductos.pagination.itemsPerPage
        },function(data) {
            $scope.productos = data.productos;
            
            $scope.tableProductos.loading = false;
            $scope.tableProductos.count = data.count;
            $scope.tableProductos.pagination = data.pagination;
        });
    };
        
    $scope.searchProductos = function() {
        $scope.tableProductos.page = 1;
        getProductos();
    };
    
    $scope.init();
});