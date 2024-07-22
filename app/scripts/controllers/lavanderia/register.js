'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:LavanderiaRegisterCtrl
 * @description
 * # LavanderiaRegisterCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('LavanderiaRegisterCtrl', function ($scope, $utilsViewService, reutilizablesService, tiposService) {
    $scope.init = function() {
        $scope.tipos = [];
        $scope.reutilizables = [];
        $scope.reutilizables_selected = [];
        $scope.loadingSearch = false;
        $scope.loadingRegister = false;
        $scope.search = '';
        getTipos();
    };
    
    var getReutilizables = function() {
        $scope.reutilizables = [];
        reutilizablesService.findEnVestidores(function(data) {
            if (data.reutilizables.length > 0) {
                $scope.reutilizables = data.reutilizables;
            } else {
                $scope.reutilizables = [];
                Materialize.toast('No se encontró indumentaria', 4000);
            }
            $scope.loadingSearch = false;
        }, function(error) {
            $scope.reutilizables = [];
            Materialize.toast(error.data.message, 4000);
            $scope.loadingSearch = false;
        });
    };
            
    $scope.registrarEnLavanderia = function(reutilizables_selected) {
        if (reutilizables_selected.length === 0) {
            Materialize.toast('No ha seleccionado ninguna indumentaria para registrar en lavandería', 4000);
            return;
        }
        
        if (!confirm('¿Está seguro de registrar el ingreso a lavandería?')) {
            return;
        }
        
        var reutilizables_id = reutilizables_selected.map(function(reutilizable) {
            return reutilizable.id;
        });
        
        $scope.loadingRegister = true;
        reutilizablesService.registrarEnLavanderia({
            reutilizables_id: reutilizables_id
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
        
    var getTipos = function() {
        $scope.loadingSearch = true;
        tiposService.getEnabled(function(data) {
           $scope.tipos = data.tipos;
           getReutilizables();
        });
    };
    
    $scope.searchReutilizable = function(tipo) {
        var reutilizablesFounded = $scope.reutilizables.filter(function(reutilizable) {
            return reutilizable.tipo_id === tipo.id && reutilizable.codigo.toString() === tipo.codigo_searched.toString();
        });
        if (reutilizablesFounded.length === 1) {
            if (!$scope.reutilizables_selected.includes(reutilizablesFounded[0])) {
                $scope.reutilizables_selected.push(reutilizablesFounded[0]);
            }
        } else {
            Materialize.toast('No se encontró esta indumentaria', 4000);
        }
        angular.element('#reutilizable' + tipo.id).select();
    };
    
    $scope.init();
});