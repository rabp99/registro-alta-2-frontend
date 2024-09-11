'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:DevolucionesIndexCtrl
 * @description
 * # VestidoresRegisterCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('VestidoresRegisterCtrl', function ($scope, $utilsViewService, reutilizablesSolicitudesDetallesService) {
    $scope.init = function() {
        $scope.dni_medico = '';
        $scope.searching = 'search';
        $scope.trabajador = {};
        $scope.reutilizablesSolicitudesDetalles = [];
        $scope.reutilizablesSolicitudesDetalle_selected = [];
        $scope.loadingSearch = false;
        $scope.loadingRegister = false;
    };
    
    $scope.search = function(dni_medico) {
        if (dni_medico.length < 8) {
            return;
        }
        
        $scope.searching = 'find_replace';
        $scope.loadingSearch = true;
        $scope.reutilizablesSolicitudesDetalles = [];
        $scope.reutilizablesSolicitudesDetalle_selected = [];
        reutilizablesSolicitudesDetallesService.findEntregadosVestidores({dni_medico: dni_medico}, function(data) {
            if (data.reutilizablesSolicitudesDetalles.length > 0) {
                $scope.reutilizablesSolicitudesDetalles = data.reutilizablesSolicitudesDetalles;
                $scope.trabajador.ndoc = data.dni_medico;
                $scope.trabajador.full_name = data.profesional;
            } else {
                $scope.trabajador = {};
                $scope.reutilizablesSolicitudesDetalles = [];
                Materialize.toast('No se encontraron solicitudes', 4000);
            }
            $scope.searching = 'search';
            $scope.loadingSearch = false;
        }, function(error) {
            $scope.trabajador = {};
            $scope.reutilizablesSolicitudesDetalles = [];
            Materialize.toast(error.data.message, 4000);
            $scope.loadingSearch = false;
        });
    };
            
    $scope.registrarEnVestidores = function(reutilizablesSolicitudesDetalle_selected) {
        if ($scope.trabajador.full_name === undefined) {
            $scope.search($scope.dni_medico);
            return;
        }
        
        if (reutilizablesSolicitudesDetalle_selected.length === 0) {
            Materialize.toast('No ha seleccionado ninguna indumentaria para registrar en vestidores', 4000);
            return;
        }
        
        if (!confirm('¿Está seguro de registrar el ingreso a vestidores?')) {
            return;
        }
        
        $scope.loadingRegister = true;
        reutilizablesSolicitudesDetallesService.registrarEnVestidores({
            reutilizables_solicitudes_detalles: reutilizablesSolicitudesDetalle_selected
        }, function(data) {
            Materialize.toast(data.message, 4000);
            $utilsViewService.enable('.btn-submit');
            $scope.init();
        }, function(error) {
            $utilsViewService.enable('.btn-submit');
            Materialize.toast(error.data.message, 4000);
            $scope.loadingRegister = false;
        });
    };
        
    $scope.init();
});