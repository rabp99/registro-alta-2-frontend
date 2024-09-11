'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ReportesCuadroResumenCtrl
 * @description
 * # ReportesCuadroResumenCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('ReportesCuadroResumenCtrl', function ($scope, solicitudesService, $utilsViewService, FileSaver) {
    $scope.init = function() {
        $scope.pre_fecha_inicio = new Date();
        $scope.pre_fecha_fin = new Date();
        $scope.loading = false;
    };

    $scope.exportCuadroResumen = function() {
        $scope.loading = true;
        var fecha_inicio = $utilsViewService.formatDateToSql($scope.pre_fecha_inicio);
        var fecha_fin = $utilsViewService.formatDateToSql($scope.pre_fecha_fin);
        
        solicitudesService.reportCuadroResumen({
            fecha_inicio: fecha_inicio || '',
            fecha_fin: fecha_fin || ''
        }, function(data) {
            var datos = new Blob([data.data], { type: 'application/vnd.ms-excel;charset=utf-8' });
            var date = new Date();
            var filename = 'reporte_cuadro_resumen_' + date.getFullYear() + $utilsViewService.strPad((date.getMonth() + 1), '00') + $utilsViewService.strPad(date.getDate(), '00') + '.xls';
            FileSaver.saveAs(datos, filename, true);
            $scope.loading = false;
        });
    };
    
    $scope.exportCuadroResumenDiario = function() {
        $scope.loading = true;
        var fecha_inicio = $utilsViewService.formatDateToSql($scope.pre_fecha_inicio);
        var fecha_fin = $utilsViewService.formatDateToSql($scope.pre_fecha_fin);
        
        solicitudesService.reportCuadroResumenDiario({
            fecha_inicio: fecha_inicio || '',
            fecha_fin: fecha_fin || ''
        }, function(data) {
            var datos = new Blob([data.data], { type: 'application/vnd.ms-excel;charset=utf-8' });
            var date = new Date();
            var filename = 'reporte_cuadro_resumen_diario_' + date.getFullYear() + $utilsViewService.strPad((date.getMonth() + 1), '00') + $utilsViewService.strPad(date.getDate(), '00') + '.xls';
            FileSaver.saveAs(datos, filename, true);
            $scope.loading = false;
        });
    };
    
    $scope.exportCuadroResumenCsv = function() {
        $scope.loading = true;
        var fecha_inicio = $utilsViewService.formatDateToSql($scope.pre_fecha_inicio);
        var fecha_fin = $utilsViewService.formatDateToSql($scope.pre_fecha_fin);
        
        solicitudesService.reportCuadroResumenCsv({
            fecha_inicio: fecha_inicio || '',
            fecha_fin: fecha_fin || ''
        }, function(data) {
            var datos = new Blob([data.data], { type: 'text/csv'});
            var date = new Date();
            var filename = 'reporte_cuadro_resumen_' + date.getFullYear() + $utilsViewService.strPad((date.getMonth() + 1), '00') + $utilsViewService.strPad(date.getDate(), '00') + '.csv';
            FileSaver.saveAs(datos, filename, true);
            $scope.loading = false;
        });
    };
    
    $scope.exportCuadroResumenDiarioCsv = function() {
        $scope.loading = true;
        var fecha_inicio = $utilsViewService.formatDateToSql($scope.pre_fecha_inicio);
        var fecha_fin = $utilsViewService.formatDateToSql($scope.pre_fecha_fin);
        
        solicitudesService.reportCuadroResumenDiarioCsv({
            fecha_inicio: fecha_inicio || '',
            fecha_fin: fecha_fin || ''
        }, function(data) {
            var datos = new Blob([data.data], { type: 'text/csv'});
            var date = new Date();
            var filename = 'reporte_cuadro_resumen_diario_' + date.getFullYear() + $utilsViewService.strPad((date.getMonth() + 1), '00') + $utilsViewService.strPad(date.getDate(), '00') + '.csv';
            FileSaver.saveAs(datos, filename, true);
            $scope.loading = false;
        });
    };
    
    $scope.init();
});