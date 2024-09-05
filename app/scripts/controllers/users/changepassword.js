'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:AseguradosChangepasswordCtrl
 * @description
 * # AseguradosChangepasswordCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('UsersChangepasswordCtrl', function (
    $cookies,
    $scope, 
    usersService, 
    $state, 
    $utilsViewService, 
    $rootScope,
    $window
) {
    $scope.init = function() {
        $scope.loading = true;
        if ($cookies.get('registro-alta-token')) {
            var user_id = $cookies.getObject('registro-alta-user').id;
            usersService.get({id: user_id}, function(data) {
                $scope.user = data.user;
                $scope.loading = false;
            });
        }
    };
    
    $scope.changePassword = function(newpassword, renespassword) {
        if (newpassword !== renespassword) {
            Materialize.toast('Las contraseñas no coinciden', 4000);
        } else {
            $utilsViewService.disable('#changePasswordBtn');
            usersService.changePassword({
                newpassword: newpassword
            }, function(data) {
                swal({
                    title: "¡Operación exitosa!",
                    text: data.message,
                    icon: "success",
                    closeOnClickOutside: false
                }).then(function(willProceed) {
                    $window.location.reload();
                    $utilsViewService.enable('#changePasswordBtn');
                });
            }, function(error) {
                $utilsViewService.enable('#changePasswordBtn');
                Materialize.toast(error.data.message, 4000);
            });
        }
    };
    
    $scope.init();
});