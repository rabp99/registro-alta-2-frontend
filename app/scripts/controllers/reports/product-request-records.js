'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ReportsProductRequestRecordsCtrl
 * @description
 * # ReportsProductRequestRecordsCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('ReportsProductRequestRecordsCtrl', function (
    $scope,
    reportsService,
    $utilsViewService
) {
    $scope.init = function() {
        $scope.worker_document_type = "DNI";
        $scope.worker_document_number = null;
        $scope.start_date = null;
        $scope.end_date = null;
        $scope.submittedSearch = false;

        $scope.table = {
            loading: false,
            headers: [],
            records: [],
            count: 0,
            page: 1,
            pagination: {
                itemsPerPage: 10,
                totalItems: 0
            },
            pageChanged: function(page) {
                this.page = page;
                getProductRequestRecordsData();
            }
        };
        $scope.submittedSearch = false;
    };

    $scope.search = function() {
        getProductRequestRecordsData();
    }

    var getProductRequestRecordsData = function () {
        $utilsViewService.disable('#searchBtn');
        $scope.submittedSearch = true;
        $scope.table.loading = true;
        var startDate = $utilsViewService.formatDateToSql($scope.start_date);
        var endDate = $utilsViewService.formatDateToSql($scope.end_date);

        reportsService.getProductRequestRecordsData({
            worker_document_type: $scope.worker_document_type,
            worker_document_number: $scope.worker_document_number,
            start_date: startDate,
            end_date: endDate,

            page: parseInt($scope.table.page),
            itemsPerPage: $scope.table.pagination.itemsPerPage
        }, function (data) {
            $scope.table.headers = data.products;
            $scope.table.records = data.records;
            $scope.table.loading = false;
            $scope.table.count = data.count;
            $scope.table.pagination = data.pagination;
            
            $utilsViewService.enable('#searchBtn');
        }, function (error) {
            $scope.table.loading = false;

            $utilsViewService.enable('#searchBtn');
            Materialize.toast(error.data.message, 4000);
        });
    }

    $scope.generateReport = function() {
        var startDate = $utilsViewService.formatDateToSql($scope.start_date);
        var endDate = $utilsViewService.formatDateToSql($scope.end_date);
        $utilsViewService.disable('#generateReportBtn');
        
        reportsService.getProductRequestRecordsFile({
            worker_document_type: $scope.worker_document_type,
            worker_document_number: $scope.worker_document_number,
            start_date: startDate,
            end_date: endDate,
        }, function (data) {
            var blob = new Blob([data.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            var downloadUrl = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'Reporte de Registro de Entrega - ' + new Date().toISOString().slice(0, 10) + '.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            $utilsViewService.enable('#generateReportBtn');
        }, function (error) {
            Materialize.toast(error.data.message, 4000);
            $utilsViewService.enable('#generateReportBtn');
        });
    }

    $scope.init();
});