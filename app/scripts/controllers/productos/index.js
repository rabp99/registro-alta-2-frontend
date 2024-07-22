'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ProductosIndexCtrl
 * @description
 * # ProductosIndexCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('ProductosIndexCtrl', function ($scope, consumiblesService) {
    $scope.init = function() {
        $scope.loading = false;
        getConsumibles();
    };
    
    var getConsumibles = function() {
        $scope.loading = true;
        consumiblesService.get(function(data) {
            $scope.consumibles = data.consumibles;
            $scope.loading = false;
        });
    };
    
    $scope.saveStock = function(new_stock, consumible_id) {
        consumiblesService.saveStock({
            new_stock: new_stock,
            consumible_id: consumible_id
        }, function(data) {
            getConsumibles();
            Materialize.toast(data.message, 4000);
        }, function(err) {
            Materialize.toast(err.data.message, 4000);
        });
    };
    
    $scope.showStock = function(stock, id) {
        $scope.old_stock = stock;
        $scope.consumible_id = id;
    };
    
    $scope.init();
});