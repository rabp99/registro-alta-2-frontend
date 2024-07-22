'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:AseguradosChangepasswordCtrl
 * @description
 * # AseguradosChangepasswordCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('UsersChangepasswordCtrl', function ($cookies, $scope, usersService, $state, $utilsViewService, $rootScope) {
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
            $utilsViewService.disable('.btn-submit');
            usersService.changePassword({
                newpassword: newpassword
            }, function(data) {
                $utilsViewService.enable('.btn-submit');
                Materialize.toast(data.message, 4000);
                
                $cookies.remove('padron-user');
                $cookies.remove('padron-token');
                $rootScope.user = undefined;
                $rootScope.logged = false;
                
                $state.go('public.login');
            }, function(error) {
                $utilsViewService.enable('.btn-submit');
                Materialize.toast(error.data.message, 4000);
            });
        }
    };
    
    $scope.init();
});