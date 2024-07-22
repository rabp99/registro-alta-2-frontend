'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ReportesReporteSemanalCtrl
 * @description
 * # ReportesReporteSemanalCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('ReportesReporteSemanalCtrl', function ($scope, solicitudesService, $utilsViewService, FileSaver) {
    $scope.init = function() {
        $scope.pre_fecha_inicio = new Date();
        $scope.pre_fecha_fin = new Date();
        $scope.loading = false;
    };
    
    $scope.exportReporteSemanal = function() {
        $scope.loading = true;
        var fecha_inicio = $utilsViewService.formatDateToSql($scope.pre_fecha_inicio);
        var fecha_fin = $utilsViewService.formatDateToSql($scope.pre_fecha_fin);
        
        if (fecha_fin < fecha_inicio) {
            Materialize.toast('La Fecha Fin es menor a la Fecha Inicio', 4000);
            $scope.loading = false;
            return;
        }
        
        var diferencia = $utilsViewService.differenceDates(fecha_inicio, fecha_fin);
        
        if (diferencia.days !== 6) {
            if (!confirm('Las fechas seleccionadas no corresponden a las de una semana, ¿Desea continuar?')) {
                $scope.loading = false;
                return;
            }
        }
        
        solicitudesService.reportReporteSemanal({
            fecha_inicio: fecha_inicio || '',
            fecha_fin: fecha_fin || ''
        }, function(data) {
            var datos = new Blob([data.data], { type: 'application/vnd.ms-excel;charset=utf-8' });
            var date = new Date();
            var filename = 'reporte_semanal_' + date.getFullYear() + $utilsViewService.strPad((date.getMonth() + 1), '00') + $utilsViewService.strPad(date.getDate(), '00') + '.xls';
            FileSaver.saveAs(datos, filename, true);
            $scope.loading = false;
        });
    };
    
    $scope.exportReporteSemanalCsv = function() {
        $scope.loading = true;
        var fecha_inicio = $utilsViewService.formatDateToSql($scope.pre_fecha_inicio);
        var fecha_fin = $utilsViewService.formatDateToSql($scope.pre_fecha_fin);
        
        if (fecha_fin < fecha_inicio) {
            Materialize.toast('La Fecha Fin es menor a la Fecha Inicio', 4000);
            $scope.loading = false;
            return;
        }
        
        var diferencia = $utilsViewService.differenceDates(fecha_inicio, fecha_fin);
        
        if (diferencia.days !== 6) {
            if (!confirm('Las fechas seleccionadas no corresponden a las de una semana, ¿Desea continuar?')) {
                $scope.loading = false;
                return;
            }
        }
        
        solicitudesService.reportReporteSemanalCsv({
            fecha_inicio: fecha_inicio || '',
            fecha_fin: fecha_fin || ''
        }, function(data) {
            var datos = new Blob([data.data], { type: 'text/csv'});
            var date = new Date();
            var filename = 'reporte_semanal_' + date.getFullYear() + $utilsViewService.strPad((date.getMonth() + 1), '00') + $utilsViewService.strPad(date.getDate(), '00') + '.csv';
            FileSaver.saveAs(datos, filename, true);
            $scope.loading = false;        
        });
    };
    
    $scope.init();
});