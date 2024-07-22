'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:UsersIndexCtrl
 * @description
 * # UsersIndexCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('UsersIndexCtrl', function ($scope, usersService) {
    $scope.init = function() {
        $scope.tableUsers = {
            loading: false,
            count: 0,
            page: 1,
            pagination: {
                itemsPerPage: 10,
                totalItems: 0
            },
            pageChanged: function(page) {
                this.page = page;
                getUsers();
            }
        };
        $scope.search = {
            username: null
        };
        getUsers();
        $scope.users = [];
    };
    
    var getUsers = function() {
        $scope.tableUsers.loading = true;
        usersService.get({
            username: $scope.search.username,
            page: parseInt($scope.tableUsers.page),
            itemsPerPage: $scope.tableUsers.pagination.itemsPerPage
        },function(data) {
            $scope.users = data.users;
            $scope.tableUsers.loading = false;
            $scope.tableUsers.count = data.count;
            $scope.tableUsers.pagination = data.pagination;
        });
    };
    
    $scope.searchUsers = function() {
        $scope.tableUsers.page = 1;
        getUsers();
    };
    
    $scope.init();
});