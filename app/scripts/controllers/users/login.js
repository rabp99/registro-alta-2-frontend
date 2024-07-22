'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('UsersLoginCtrl', function ($scope, usersService, $cookies, $state, $rootScope, $utilsViewService) {
    $scope.init = function() {
        $scope.user = {};  
    };

    $scope.loginUser = function(user, boton) {
        $scope.loading = true;
        $cookies.remove('registro-alta-user');
        $cookies.remove('registro-alta-token');
        $utilsViewService.disable('.btn-submit');
                
        usersService.login({
            username: user.username,
            password: user.password
        }, function(data) {
            if (!data.user) {
                $utilsViewService.enable('.btn-submit');
                $scope.loading = false;
            } else {
                $cookies.putObject('registro-alta-user', data.user);
                $cookies.put('registro-alta-token', data.token);
                $rootScope.user = data.user;
                $rootScope.logged = true;
                $utilsViewService.enable('.btn-submit');

                $state.go('admin.main'); 
            }
        }, function(err) {
            Materialize.toast('El usuario o la contraseña es incorrecta', 4000);
            $utilsViewService.enable('.btn-submit');
            $scope.loading = false;
        });
    };
    
    $scope.init();
});