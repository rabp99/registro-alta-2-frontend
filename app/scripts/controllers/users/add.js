'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:UsersAddCtrl
 * @description
 * # UsersAddCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('UsersAddCtrl', function ($scope, usersService, $state) {
    $scope.init = function() {
        $scope.newUser = {};
        $scope.loading = false;
        getRoles();
    };
    
    $scope.registrarUser = function(newUser) {
        $scope.loading = true;
        newUser.password = newUser.username;
        usersService.save(newUser, function(data) {
            $state.go('admin.usersIndex'); 
            $scope.loading = false;
            Materialize.toast(data.message, 4000);
        }, function(err) {
            Materialize.toast(err.data.message, 4000);
        });
    };
    
    var getRoles = function() {
        $scope.roles = [
            'Administrador',
            'Farmacia',
            'Vestidores',
            'Lavandería',
            'Médico Ocupacional',
            'Jefe de Servicio'
        ];
    };
    
    $scope.init();
});