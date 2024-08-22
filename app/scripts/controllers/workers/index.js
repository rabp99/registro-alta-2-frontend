'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:WorkersIndexCtrl
 * @description
 * # WorkersIndexCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
    .controller('WorkersIndexCtrl', function ($scope, workersService) {
        $scope.init = function () {
            $scope.tableWorkers = {
                loading: false,
                count: 0,
                page: 1,
                pagination: {
                    itemsPerPage: 10,
                    totalItems: 0
                },
                pageChanged: function (page) {
                    this.page = page;
                    getWorkers();
                }
            };
            $scope.search = {
                document_number: null
            };
            getWorkers();
            $scope.workers = [];
        };

        var getWorkers = function () {
            $scope.tableWorkers.loading = true;
            workersService.get({
                document_number: $scope.search.document_number,
                page: parseInt($scope.tableWorkers.page),
                itemsPerPage: $scope.tableWorkers.pagination.itemsPerPage
            }, function (data) {
                $scope.workers = data.workers;
                $scope.tableWorkers.loading = false;
                $scope.tableWorkers.count = data.count;
                $scope.tableWorkers.pagination = data.pagination;
            });
        };

        $scope.searchWorkers = function () {
            $scope.tableWorkers.page = 1;
            getWorkers();
        };

        $scope.init();
    });