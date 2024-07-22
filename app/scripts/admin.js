'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('AdminCtrl', function ($scope, $timeout) {
    $scope.resetLinks = function() {
        if (angular.element('#reportes-link').attr('class') !== undefined) {
            var active = angular.element('#reportes-link').attr('class').split(/\s+/).includes('active');
            if (active) {
                angular.element('#reportes-link').toggleClass('active');
            }
        }
    };
});