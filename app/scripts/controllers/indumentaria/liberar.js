'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:IndumentariaLiberarCtrl
 * @description
 * # IndumentariaLiberarCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('IndumentariaLiberarCtrl', function ($scope, tiposService, reutilizablesService, $utilsViewService) {
    $scope.init = function() {
        $scope.loading = false;
        $scope.reutilizables = [];
        getTipos();
    };
    
    var getTipos = function() {
        $scope.loading = true;
        tiposService.getEnabled(function(data){
            $scope.codigos = data.tipos.map(function(tipo) {
                return {tipo_descripcion: tipo.descripcion, tipo_id: tipo.id, numeros: ''};
            });
            $scope.loading = false;
        });
    };

    $scope.liberarIndumentaria = function(codigos) {
        if (!confirm('¿Está seguro de realizar este registro?')) {
            return;
        };
        
        $utilsViewService.disable('.btn-submit');
        $scope.loadingRegister = true;
        reutilizablesService.liberar({codigos: codigos}, function(data) {
            Materialize.toast(data.message, 4000);
            $utilsViewService.enable('.btn-submit');
            $scope.init();
            $scope.loadingRegister = false;
        }, function(err) {
            Materialize.toast(err.data.message, 4000);
            $utilsViewService.enable('.btn-submit');
            $scope.init();
            $scope.loadingRegister = false;
        });
    };
    
    $scope.init();
});