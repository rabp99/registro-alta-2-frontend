'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ProductRequestsAttendCtrl
 * @description
 * # ProductRequestsAttendCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
    .controller('ProductRequestsAttendCtrl', function (
        $scope, 
        workersService,
        productRequestsService,
        webSocketService,
        $window,
        $utilsViewService,
        envService
    ) {
        var waitingSignature = false;

        $scope.init = function () {
            $scope.step = 1;
            $scope.worker_document_type = "DNI";
            $scope.worker_document_number = null;
            $scope.searchingWorker = false;
            $scope.selectedWorker = null;
            $scope.productRequests = [];
            $scope.selectedProductRequestCode = null;
            $scope.selectedProductRequest = null;

            $scope.signature = null;
            webSocketService.connect(envService.getWSHost());
            webSocketService.onMessage = function(payload) {
                var data = JSON.parse(payload);
                if (waitingSignature) {
                    if (data.worker_document_type === $scope.worker_document_type && 
                        data.worker_document_number === $scope.worker_document_number
                    ) {
                        $scope.signature = data.signature;
                    }
                }
            };
        };

        $scope.checkEnter = function(event) {
            if (event.which === 13) { // Enter key code
                $scope.searchWorker($scope.worker_document_type, $scope.worker_document_number);
            }
        };
    
        $scope.searchWorker = function(document_type, document_number) {
            $scope.searchingWorker = true;
            workersService.findByDocument({
                document_type: document_type,
                document_number: document_number,
            }, function (data) {
                $scope.searchingWorker = false;
                $scope.selectedWorker = data.worker;
            }, function (error) {
                $scope.searchingWorker = false;
                Materialize.toast(error.data.message, 4000);
            });
        }
    
        $scope.onSelectWorker = function (worker) {
            $utilsViewService.disable('#selectWorkerBtn');
            productRequestsService.getActiveByWorker({
                document_type: worker.document_type,
                document_number: worker.document_number,
            }, function (data) {
                $scope.productRequests = data.productRequests;
                $scope.step = 2;

                $utilsViewService.enable('#selectWorkerBtn');
            }, function (error) {
                Materialize.toast(error.data.message, 4000);
                $utilsViewService.enable('#selectWorkerBtn');
            });
        }
    
        $scope.backToSelectWorker = function() {
            $scope.selectedProductRequest = null;
            $scope.step = 1;
        }

        $scope.backToSelectProductRequest = function() {
            $scope.signature = null;
            $scope.step = 2;
        }

        $scope.backToSign = function() {
            $scope.step = 3;
        }
    
        $scope.onSelectProductRequest = function() {
            waitingSignature = true;
            $scope.step = 3;
        }

        $scope.onSign = function() {
            $scope.step = 4;
        }

        $scope.selectProductRequest = function(selectedProductRequestCode) {
            if (selectedProductRequestCode) {
                var found = $scope.productRequests.filter(function(productRequest) {
                    return productRequest.year == selectedProductRequestCode.year && productRequest.number == selectedProductRequestCode.number;
                });
                if (found) {
                    $scope.selectedProductRequest = found[0];
                }
            }
        };

        $scope.save = function() {
            $utilsViewService.disable('#saveBtn');
            
            productRequestsService.attend({
                product_request_year: $scope.selectedProductRequest.year,
                product_request_number: $scope.selectedProductRequest.number,
                signature: $scope.signature
            }, function(data) {
                swal({
                    title: "¡Operación exitosa!",
                    text: data.message,
                    icon: "success",
                    closeOnClickOutside: false
                }).then(function(willProceed) {
                    $window.location.reload();
                });
            }, function(error) {
                $utilsViewService.enable('#saveBtn');
                Materialize.toast(error.data.message, 4000);
            });
        }

        $scope.init();
    });