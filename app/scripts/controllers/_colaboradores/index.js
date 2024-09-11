'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ColaboradoresIndexCtrl
 * @description
 * # ColaboradoresIndexCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
    .controller('ColaboradoresIndexCtrl', function ($scope, colaboradoresService) {
        $scope.init = function () {
            $scope.tableColaboradores = {
                loading: false,
                count: 0,
                page: 1,
                pagination: {
                    itemsPerPage: 10,
                    totalItems: 0
                },
                pageChanged: function (page) {
                    this.page = page;
                    getColaboradores();
                }
            };
            $scope.search = {
                nro_documento: null
            };
            getColaboradores();
            $scope.colaboradores = [];
        };

        var getColaboradores = function () {
            $scope.tableColaboradores.loading = true;
            colaboradoresService.get({
                dni_medico: $scope.search.dni_medico,
                page: parseInt($scope.tableColaboradores.page),
                itemsPerPage: $scope.tableColaboradores.pagination.itemsPerPage
            }, function (data) {
                $scope.colaboradores = data.colaboradores;
                $scope.tableColaboradores.loading = false;
                $scope.tableColaboradores.count = data.count;
                $scope.tableColaboradores.pagination = data.pagination;
            });
        };

        $scope.searchColaboradores = function () {
            $scope.tableColaboradores.page = 1;
            getColaboradores();
        };

        $scope.init();
    });