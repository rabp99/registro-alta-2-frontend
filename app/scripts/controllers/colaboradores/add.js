'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ColaboradoresAddCtrl
 * @description
 * # ColaboradoresAddCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('ColaboradoresAddCtrl', function ($scope, colaboradoresService, $state, gruposOcupacionalesService) {
    $scope.init = function() {
        $scope.newColaborador = {};
        $scope.loading = false;
        getGruposOcupacionales();
    };
    
    $scope.registrarColaborador = function(newColaborador) {
        $scope.loading = true;
        colaboradoresService.save(newColaborador, function(data) {
            $state.go('admin.colaboradoresIndex'); 
            $scope.loading = false;
            Materialize.toast(data.message, 4000);
        }, function(err) {
            Materialize.toast(err.data.message, 4000);
        });
    };
    
    var getGruposOcupacionales = function() {
        $scope.loadingGruposOcupacionales = true;
        gruposOcupacionalesService.getAllowShow(function(data) {
            $scope.grupos_ocupacionales = data.gruposOcupacionales;
            $scope.loadingGruposOcupacionales = false;
        });
    };
    
    $scope.init();
});