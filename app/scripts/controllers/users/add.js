'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:UsersAddCtrl
 * @description
 * # UsersAddCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('UsersAddCtrl', function (
    $scope, 
    usersService, 
    $state,
    $utilsViewService
) {
    $scope.init = function() {
        $scope.newUser = {};
        $scope.loading = false;
        getRoles();
    };
    
    $scope.addUser = function(newUser) {
        if (!validate()) {
            return;
        }

        $utilsViewService.disable("#addUserBtn");
        
        $scope.loading = true;
        newUser.password = newUser.username;
        usersService.save(newUser, function(data) {
            $scope.loading = false;

            swal({
                title: "¡Operación exitosa!",
                text: data.message,
                icon: "success",
                closeOnClickOutside: false
            }).then(function(willProceed) {
                $utilsViewService.enable('#addUserBtn');
                $state.go('admin.usersIndex'); 
            });
        }, function(err) {
            $utilsViewService.enable("#addUserBtn");
            Materialize.toast(err.data.message, 4000);
        });
    };
    
    var getRoles = function() {
        $scope.roles = [
            'Administrador',
            'Farmacia',
        ];
    };
    
    var validate = function() {
        if (!$scope.newUser.rol) {
            Materialize.toast("Seleccione el Rol", 4000);
            return false;
        }
        return true;
    }

    $scope.init();
});