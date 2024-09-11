'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:SalidasRegisterCtrl
 * @description
 * # SalidasRegisterCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('SalidasRegisterCtrl', function ($scope, salidasService, $utilsViewService, personasService, $interval) {
    $scope.init = function() {
        $scope.salida = {};
        $scope.trabajador = {
            apellido_paterno: '',
            apellido_materno: '',
            nombres: ''
        };
        $interval(function(){
            var today = new Date();
            $scope.pre_fecha_hora = new Date($utilsViewService.formatDateTimeToSqlWithoutSeconds(today));
        }, 1000);
                
        $scope.searching = 'search';
    };
    
    $scope.registerSalida = function(salida, trabajador, preFechaHora) {
        if (trabajador.apellido_paterno.trim() === '' || trabajador.apellido_materno.trim() === '' || trabajador.nombres.trim() === '') {
            Materialize.toast('No se ha seleccionado un trabajador', 4000);
            return;
        }
               
        salida.fecha_hora = $utilsViewService.formatDateTimeToSql(preFechaHora);
        $utilsViewService.disable('.btn-submit');
        salidasService.save({
            trabajador: trabajador,
            salida: salida
        }, function(data) {
            Materialize.toast(data.message, 4000);
            $utilsViewService.enable('.btn-submit');
            $scope.init();
        }, function(error) {
            $utilsViewService.enable('.btn-submit');
            Materialize.toast(error.data.message, 4000);
            Materialize.toast($utilsViewService.getErrors(error.data.errors), 4000);
        });
    };
    
    $scope.search = function(dni) {
        $scope.searching = 'find_replace';
        personasService.get({dni: dni}, function(data) {
            if (data.dni !== undefined) {
                $scope.trabajador.apellido_paterno = data.apellidoPaterno;
                $scope.trabajador.apellido_materno = data.apellidoMaterno;
                $scope.trabajador.nombres = data.nombres; 
                $scope.trabajador.dni = data.dni;
                $scope.searching = 'search';
            }
        });
    };
    
    $scope.init();
});