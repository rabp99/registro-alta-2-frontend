'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ReportesIndumentariaCtrl
 * @description
 * # ReportesIndumentariaCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('ReportesIndumentariaCtrl', function ($scope, reutilizablesService, $utilsViewService, tiposService, FileSaver) {
    $scope.init = function() {
        $scope.inicio = true;
        
        $scope.tableReutilizables = {
            loading: false,
            count: 0,
            page: 1,
            pagination: {
                itemsPerPage: 10,
                totalItems: 0
            },
            pageChanged: function(page) {
                this.page = page;
                getReutilizables();
            }
        };
        
        $scope.search = {
            tipo_id: '',
            estado_id: '',
            codigo: ''
        };
        
        $scope.reutilizables = [];
        $scope.tipos = [];
        $scope.loading = false;
        getTipos();
        $scope.estados = [
            {
                id: 7,
                descripcion: 'Disponible'
            },{
                id: 8,
                descripcion: 'Ocupada'
            },{
                id: 12,
                descripcion: 'En Vestidores'
            },{
                id: 13,
                descripcion: 'En Lavandería'
            }
        ];
    };

    var getReutilizables = function() {
        $scope.reutilizables = [];
        $scope.tableReutilizables.loading = true;
        $scope.inicio = false;
        
        reutilizablesService.report({
            tipo_id: $scope.search.tipo_id || '',
            estado_id: $scope.search.estado_id || '',
            codigo: $scope.search.codigo || '',
            
            page: $scope.tableReutilizables.page,
            itemsPerPage: $scope.tableReutilizables.pagination.itemsPerPage
        },function(data) {
            $scope.reutilizables = data.reutilizables;
            
            $scope.tableReutilizables.loading = false;
            $scope.tableReutilizables.count = data.count;
            $scope.tableReutilizables.pagination = data.pagination;
        });
    };
        
    $scope.searchIndumentaria = function() {
        $scope.tableReutilizables.page = 1;
        getReutilizables();
    };
    
    var getTipos = function() {
        tiposService.getEnabled(function(data) {
           $scope.tipos = data.tipos; 
        });
    };
    
    $scope.exportExcel = function() {
        $scope.loading = true;
        reutilizablesService.exportExcel({
            tipo_id: $scope.search.tipo_id || '',
            estado_id: $scope.search.estado_id || '',
            codigo: $scope.search.codigo || ''
        }, function(data) {
            var datos = new Blob([data.data], { type: 'application/vnd.ms-excel;charset=utf-8' });
            var date = new Date();
            var filename = 'reporte_indumentaria_' + date.getFullYear() + $utilsViewService.strPad((date.getMonth() + 1), '00') + $utilsViewService.strPad(date.getDate(), '00') + '.xls';
            FileSaver.saveAs(datos, filename, true);
            $scope.loading = false;
        });
    };
    
    $scope.reportHistorial = function(reutilizable) {
        $scope.loading = true;
        reutilizablesService.reportHistorial({
            reutilizable_id: reutilizable.id || ''
        }, function(data) {
            var datos = new Blob([data.data], { type: 'application/vnd.ms-excel;charset=utf-8' });
            var date = new Date();
            var filename = 'historial_indumentaria_' + date.getFullYear() + $utilsViewService.strPad((date.getMonth() + 1), '00') + $utilsViewService.strPad(date.getDate(), '00') + '.xls';
            FileSaver.saveAs(datos, filename, true);
            $scope.loading = false;
        });
    };
    
    $scope.init();
});