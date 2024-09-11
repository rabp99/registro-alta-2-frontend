'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ProgramacionesLoadCtrl
 * @description
 * # ProgramacionesLoadCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
    .controller('ProgramacionesLoadCtrl', function ($scope, programacionesService, $utilsViewService) {
        $scope.init = function () {
            $scope.loadingLoad = false;
        };

        $scope.loadProgramaciones = function (file) {
            var fd = new FormData();
            fd.append('file', file);

            $utilsViewService.disable('.btn-submit');
            $scope.loadingLoad = true;
            programacionesService.load(fd, function (data) {
                Materialize.toast(data.message, 4000);
                $utilsViewService.enable('.btn-submit');
                $scope.init();
            }, function (error) {
                $utilsViewService.enable('.btn-submit');
                $scope.loadingLoad = false;
                console.log(error);
                Materialize.toast(error.data.message, 4000);
                Materialize.toast($utilsViewService.getErrors(error.data.errors), 4000);
            });
        };

        $scope.init();
    });