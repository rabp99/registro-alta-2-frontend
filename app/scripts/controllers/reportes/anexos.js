'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ReportesAnexosCtrl
 * @description
 * # ReportesAnexosCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('ReportesAnexosCtrl', function ($scope, solicitudesService, $utilsViewService, FileSaver) {
    $scope.init = function() {
        $scope.pre_fecha_inicio = new Date();
        $scope.pre_fecha_fin = new Date();
        $scope.loading = false;
    };

    $scope.exportAnexo3 = function() {
        $scope.loading = true;
        var fecha_inicio = $utilsViewService.formatDateToSql($scope.pre_fecha_inicio);
        var fecha_fin = $utilsViewService.formatDateToSql($scope.pre_fecha_fin);
        
        solicitudesService.reportAnexo3({
            fecha_inicio: fecha_inicio || '',
            fecha_fin: fecha_fin || ''
        }, function(data) {
            var datos = new Blob([data.data], { type: 'application/vnd.ms-excel;charset=utf-8' });
            var date = new Date();
            var filename = 'reporte_anexo3_' + date.getFullYear() + $utilsViewService.strPad((date.getMonth() + 1), '00') + $utilsViewService.strPad(date.getDate(), '00') + '.xls';
            FileSaver.saveAs(datos, filename, true);
            $scope.loading = false;
        });
    };
    
    $scope.exportAnexo4 = function() {
        $scope.loading = true;
        var fecha_inicio = $utilsViewService.formatDateToSql($scope.pre_fecha_inicio);
        var fecha_fin = $utilsViewService.formatDateToSql($scope.pre_fecha_fin);
        
        solicitudesService.reportAnexo4({
            fecha_inicio: fecha_inicio || '',
            fecha_fin: fecha_fin || ''
        }, function(data) {
            var datos = new Blob([data.data], { type: 'application/vnd.ms-excel;charset=utf-8' });
            var date = new Date();
            var filename = 'reporte_anexo4_' + date.getFullYear() + $utilsViewService.strPad((date.getMonth() + 1), '00') + $utilsViewService.strPad(date.getDate(), '00') + '.xls';
            FileSaver.saveAs(datos, filename, true);
            $scope.loading = false;
        });
    };
            
    $scope.init();
});