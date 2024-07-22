'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ReportesMarcacionesCtrl
 * @description
 * # ReportesMarcacionesCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('ReportesMarcacionesCtrl', function ($scope, programacionesService, $utilsViewService, FileSaver) {
    $scope.init = function() {
        $scope.inicio = true;
        
        $scope.tableProgramaciones = {
            loading: false,
            count: 0,
            page: 1,
            pagination: {
                itemsPerPage: 10,
                totalItems: 0
            },
            pageChanged: function(page) {
                this.page = page;
                getProgramaciones();
            }
        };
        
        $scope.search = {
            dni: ''
        };
        
        $scope.pre_fecha = new Date();
         
        $scope.programaciones = [];
        $scope.loading = false;
    };

    var getProgramaciones = function() {
        $scope.programaciones = [];
        $scope.tableProgramaciones.loading = true;
        $scope.inicio = false;
        
        var fecha = $utilsViewService.formatDateToSql($scope.pre_fecha);
        
        programacionesService.report({
            dni: $scope.search.dni,
            fecha: fecha || '',
            
            page: parseInt($scope.tableProgramaciones.page),
            itemsPerPage: $scope.tableProgramaciones.pagination.itemsPerPage
        },function(data) {
            $scope.programaciones = data.programaciones;
            
            $scope.tableProgramaciones.loading = false;
            $scope.tableProgramaciones.count = data.count;
            $scope.tableProgramaciones.pagination = data.pagination;
        });
    };
        
    $scope.searchProgramaciones = function() {
        $scope.tableProgramaciones.page = 1;
        getProgramaciones();
    };
    
    $scope.exportExcel = function() {
        $scope.loading = true;
        var fecha = $utilsViewService.formatDateToSql($scope.pre_fecha);
        
        programacionesService.exportExcel({
            dni: $scope.search.dni,
            fecha: fecha || ''            
        },function(data) {
            var datos = new Blob([data.data], { type: 'application/vnd.ms-excel;charset=utf-8' });
            var date = new Date();
            var filename = 'reporte_marcaciones_' + date.getFullYear() + $utilsViewService.strPad((date.getMonth() + 1), '00') + $utilsViewService.strPad(date.getDate(), '00') + '.xls';
            FileSaver.saveAs(datos, filename, true);
            $scope.loading = false;
        });
    };
    
    $scope.init();
});