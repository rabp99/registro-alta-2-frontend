'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:SupervisoresAddCtrl
 * @description
 * # SupervisoresAddCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
  .controller('SupervisoresAddCtrl', function ($scope, supervisoresService, $state) {
    $scope.init = function() {
        $scope.newSupervisor = {};
        $scope.loading = false;
    };
    
    $scope.registrarSupervisor = function(newSupervisor) {
        $scope.loading = true;
        supervisoresService.save(newSupervisor, function(data) {
            $state.go('admin.supervisoresIndex'); 
            $scope.loading = false;
            Materialize.toast(data.message, 4000);
        }, function(err) {
            Materialize.toast(err.data.message, 4000);
        });
    };
    
    $scope.init();
});